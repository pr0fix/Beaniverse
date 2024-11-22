import express, { Request, Response } from "express";
import loginService from "../services/loginService";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const result = await loginService.login(username, password);
    if (result.error) {
      res.status(401).send(result);
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

export default router;
