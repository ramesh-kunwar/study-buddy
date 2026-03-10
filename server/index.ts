import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./src/db/db";

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello, Study Buddy!");
});

function startServer() {
  app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
