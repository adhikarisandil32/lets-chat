import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "@src/config/config";

const app = express();

app.use(cors({ origin: config.ALLOWED_CORS_ORIGINS ?? false }));
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get(`${config.API_PREFIX}`, (req, res) => {
  res.json({ Test: "success" });
  return;
});

export { app };
