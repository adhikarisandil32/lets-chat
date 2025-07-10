import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "@src/config/config";

const app = express();
const API_PREFIX = config.API_PREFIX?.startsWith("/")
  ? config.API_PREFIX
  : `/${config.API_PREFIX ?? ""}`;

app.use(cors({ origin: config.ALLOWED_CORS_ORIGINS ?? false }));
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get(`${API_PREFIX}`, (req, res) => {
  res.json({ Test: "success" });
  return;
});

export { app };
