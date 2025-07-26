import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "@src/config/config.js";

const app = express();

app.use(cors({ origin: config.ALLOWED_CORS_ORIGINS ?? false }));
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// function getIpAddress() {}

// const ipAddress = getIpAddress();

app.get(`${config.API_PREFIX}`, (_, res) => {
  res.json({ Test: "success" });
  return;
});

export { app };
