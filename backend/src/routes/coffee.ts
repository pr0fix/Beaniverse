import express, { Request, Response } from "express";
import coffeeService from "../services/coffeeService";
import {
  authenticateRole,
  authenticateToken,
} from "../middleware/authMiddleware";
import Coffee from "../models/coffee";
import { ICoffee } from "../utils/types";

const router = express.Router();

// get all coffees in DB
router.get("/coffee", async (_req: Request, res: Response) => {
  try {
    const coffees = await coffeeService.getAllCoffees();
    res.status(200).json(coffees);
  } catch (error) {
    console.error("Error fetching coffee items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get coffee by id from DB
router.get("/coffee/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const coffee = await coffeeService.getCoffeeById(id);
    if (!coffee) {
      res.status(404).json({ error: "Coffee not found" });
      return;
    }
    res.status(200).json(coffee);
  } catch (error) {
    console.error("Error fetching coffee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// add new coffee to DB
router.post(
  "/coffee",
  authenticateToken,
  authenticateRole,
  async (req: Request, res: Response) => {
    const { name, price, description, type, stock }: ICoffee = req.body;

    try {
      const newCoffee = await coffeeService.addCoffee(
        name,
        price,
        description,
        type,
        stock
      );
      res.status(201).json(newCoffee);
    } catch (error) {
      console.error("Error adding coffee item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// update coffee in DB
router.put(
  "/coffee/:id",
  authenticateToken,
  authenticateRole,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...updatedData }: Partial<ICoffee> = req.body;

    try {
      const coffeeToUpdate = await coffeeService.updateCoffee(id, updatedData);
      if (coffeeToUpdate) {
        res.status(200).json(coffeeToUpdate);
      } else {
        res.status(404).json({ error: "Coffee to update not found" });
      }
    } catch (error) {
      console.error("Error updating coffee:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// delete coffee from ID
router.delete(
  "/coffee/:id",
  authenticateToken,
  authenticateRole,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const exists = await Coffee.findById(id);
      if (!exists) {
        res.status(404).json({ error: "Coffee not found" });
        return;
      }
      await coffeeService.deleteCoffee(id);
      res.status(200).json({ message: "Coffee deleted successfully" });
    } catch (error) {
      console.error("Error deleting coffee:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
