import express, { Request, Response } from "express";
import authService from "../services/authService";
import {
  authenticateRole,
  authenticateToken,
} from "../middleware/authMiddleware";

interface LoginRequestBody {
  username: string;
  password: string;
}

interface SignupRequestBody extends LoginRequestBody {
  name: string;
}

const router = express.Router();

// login user
router.post(
  "/login",
  async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
    const { username, password } = req.body;
    try {
      const result = await authService.login(username, password);
      if (result.error) {
        res.status(401).send({ error: "Invalid credentials" });
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).send({ error: "Internal server error" });
    }
  }
);

// add new user
router.post(
  "/signup",
  async (req: Request<{}, {}, SignupRequestBody>, res: Response) => {
    const { username, name, password } = req.body;
    const role: string = "user";
    try {
      const result = await authService.signup(role, username, name, password);
      res.status(201).send(result);
    } catch (error: unknown) {
      console.error("Signup error:", error);
      if (error instanceof Error) {
        res.status(400).json({ error: "Invalid input" });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }
);

router.post(
  "/admin/signup",
  authenticateToken,
  authenticateRole,
  async (req: Request<{}, {}, SignupRequestBody>, res: Response) => {
    const { username, name, password } = req.body;
    const role: string = "admin";
    try {
      const result = await authService.signup(role, username, name, password);
      res.status(201).send(result);
    } catch (error) {
      console.error("Admin signup error:", error);
      if (error instanceof Error) {
        res.status(400).json({ error: "Invalid input" });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }
);

export default router;
