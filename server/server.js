import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { createServer } from "./src/app.js";

const app = await createServer();
const port = process.env.PORT || 5000;

app.listen(port, () => 
  console.log(`Server running on port ${port}`)
);