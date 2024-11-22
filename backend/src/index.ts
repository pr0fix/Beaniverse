import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import loginRouter from "./routes/login";
import signupRouter from "./routes/signup";
import { PORT } from "./utils/constants";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.get("/ping", (_req: Request, res: Response) => {
  res.send("pong");
});

app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
