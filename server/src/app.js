import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function createServer() {
  const app = express();
  app.use(express.json());
  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB error:", err);
  }

  app.get("/api/health", (req, res) => res.json({ ok: true }));

  return app;
}