import express, { Response, Request } from "express";
import {
  authenticateRole,
  authenticateToken,
} from "../middleware/authMiddleware";
import userService from "../services/userService";

const router = express.Router();

router.get(
  "/users",
  authenticateToken,
  authenticateRole,
  async (_req: Request, res: Response) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/users/:id",
  authenticateToken,
  authenticateRole,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
