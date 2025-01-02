import express, { Response, Request } from "express";
import {
  authenticateRole,
  authenticateToken,
} from "../middleware/authMiddleware";
import userService from "../services/userService";
import { IUser } from "../utils/types";

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

router.put(
  "/users/:id",
  authenticateToken,
  authenticateRole,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const userData: Partial<IUser> = req.body;
    try {
      const updatedUser = await userService.editUser(id, userData);
      if (!updatedUser) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.delete(
  "/users/:id",
  authenticateToken,
  authenticateRole,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const success = await userService.deleteUser(id);
      if (!success) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
