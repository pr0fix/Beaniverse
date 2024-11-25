import express, { Request, Response } from "express";
import coffeeService from "../services/coffeeService";
import {
  authenticateRole,
  authenticateToken,
} from "../middleware/authMiddleware";

const router = express.Router();

router.get("/coffee", async (_req: Request, res: Response) => {
  try {
    const coffees = await coffeeService.getAllCoffees();
    res.status(200).json(coffees);
  } catch (error) {
    console.error("Error fetching coffee items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post(
  "/coffee",
  authenticateToken,
  authenticateRole("admin"),
  async (req: Request, res: Response) => {
    const { name, price, description, category } = req.body;

    try {
      const newCoffee = await coffeeService.addCoffee(
        name,
        price,
        description,
        category
      );
      res.status(201).json(newCoffee);
    } catch (error) {
      console.error("Error adding coffee item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

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

router.delete(
  "/coffee/:id",
  authenticateToken,
  authenticateRole("admin"),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const coffeeToDelete = await coffeeService.deleteCoffee(id);
      console.log(coffeeToDelete);
      if (coffeeToDelete) res.status(200).json(coffeeToDelete);
    } catch (error) {
      console.error("Error deleting coffee:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
