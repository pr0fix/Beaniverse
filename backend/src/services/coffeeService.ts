import Coffee from "../models/coffee";
import { ICoffee } from "../utils/types";

const getAllCoffees = async () => {
  try {
    const coffees = await Coffee.find({});
    return coffees;
  } catch (error) {
    console.error("Error fetching coffee items:", error);
    throw new Error("Error fetching coffee items");
  }
};

const getCoffeeById = async (id: string) => {
  try {
    const coffee = await Coffee.findById(id);
    if (!coffee) {
      throw new Error("Coffee not found");
    }
    return coffee;
  } catch (error) {
    console.error(`Error fetching coffee with id {${id}}: `, error);
    throw new Error("Error fetching coffee");
  }
};

const addCoffee = async (
  name: string,
  price: number,
  description: string,
  type: string,
  stock: number
) => {
  const coffee = new Coffee({ name, price, description, type, stock });
  try {
    const savedCoffee = await coffee.save();
    return savedCoffee;
  } catch (error) {
    console.error("Error adding coffee item:", error);
    throw new Error("Error adding coffee item");
  }
};

const updateCoffee = async (id: string, updatedData: Partial<ICoffee>) => {
  try {
    const coffeeToUpdate = await Coffee.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!coffeeToUpdate) throw new Error("Coffee to update not found");
    return coffeeToUpdate;
  } catch (error) {
    console.error(`Error updating coffee with id {${id}}:`, error);
    throw new Error("Error deleting coffee");
  }
};

const deleteCoffee = async (id: string) => {
  try {
    const coffeeToDelete = await Coffee.findByIdAndDelete(id);
    if (!coffeeToDelete) {
      throw new Error("Coffee to delete not found");
    }
    return coffeeToDelete;
  } catch (error) {
    console.error(`Error deleting coffee with id {${id}}:`, error);
    throw new Error("Error deleting coffee");
  }
};

export default {
  getAllCoffees,
  getCoffeeById,
  addCoffee,
  updateCoffee,
  deleteCoffee,
};
