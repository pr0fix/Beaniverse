import express, { Request, Response } from "express";
import orderService from "../services/orderService";
import {
  authenticateRole,
  authenticateToken,
} from "../middleware/authMiddleware";
import { RequestWithUser, Status } from "../utils/types";
import mongoose from "mongoose";

interface OrderBody {
  userId: mongoose.Types.ObjectId;
  items: string[];
}

interface UpdateStatusBody {
  orderId: mongoose.Types.ObjectId;
  newStatus: Status;
}

const router = express.Router();

router.get(
  "/orders/all",
  authenticateToken,
  authenticateRole,
  async (_req: Request, res: Response) => {
    try {
      const orders = await orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/orders/user",
  authenticateToken,
  async (req: RequestWithUser, res: Response) => {
    const userId: mongoose.Types.ObjectId = req.user.id;
    try {
      const orders = await orderService.getOrdersByUserId(userId);
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching user orders:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.post(
  "/orders/create",
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

router.patch(
  "/orders/update-status",
  authenticateToken,
  authenticateRole,
  async (req: Request, res: Response) => {
    const { orderId, newStatus }: UpdateStatusBody = req.body;

    try {
      const updatedOrder = await orderService.updateOrderStatus(
        orderId,
        newStatus
      );
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
