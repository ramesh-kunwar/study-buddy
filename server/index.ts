import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import connectDB from "./src/db/db";
import authRoutes from "./src/features/auth/auth.routes";
import { CONFIG } from "./src/config";

const app = express();
const PORT = CONFIG.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.get("/", (req, res) => {
  res.send("Hello, Study Buddy!");
});

app.use("/api/auth", authRoutes);

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
