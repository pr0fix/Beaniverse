import express, { Request, Response } from "express";
import signupService from "../services/signupService";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { username, name, password } = req.body;

  try {
    const result = await signupService.signup(username, name, password);
    res.status(201).send(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res
        .status(500)
        .json({ error: "An error occurred while saving the user" });
    }
  }
});

export default router;
