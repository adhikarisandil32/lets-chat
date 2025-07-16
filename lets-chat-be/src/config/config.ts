import dotenv from "dotenv";

dotenv.config();

interface Config {
  PORT: number;
  NETWORK_ADDRESS: string | undefined;
  NODE_ENV: "prod" | "dev";
  API_PREFIX: string | undefined;
  API_DOCS_ENDPOINT: string;
  ALLOWED_CORS_ORIGINS: string[] | undefined;
}

export const config: Config = {
  NODE_ENV: (process.env.NODE_ENV as Config["NODE_ENV"]) || "dev",
  PORT: +process.env.PORT! || 3000,
  NETWORK_ADDRESS: process.env.NETWORK_ADDRESS,
  API_PREFIX: process.env.API_PREFIX?.startsWith("/")
    ? process.env.API_PREFIX
    : `/${process.env.API_PREFIX ?? ""}`,
  API_DOCS_ENDPOINT: process.env.API_DOCS_ENDPOINT!,
  ALLOWED_CORS_ORIGINS: process.env.ALLOWED_CORS_ORIGINS?.split(","),
};
