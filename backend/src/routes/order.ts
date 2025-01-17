import express, { Request, Response } from "express";
import orderService from "../services/orderService";
import { authenticateToken } from "../middleware/authMiddleware";

interface OrderBody {
  userId: string;
  items: string[];
}

const router = express.Router();

router.post(
  "/order",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { userId, items }: OrderBody = req.body;

    try {
      const newOrder = await orderService.createOrder(userId, items);
      res.status(201).json(newOrder);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
