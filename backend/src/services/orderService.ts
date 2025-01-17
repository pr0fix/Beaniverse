import Coffee from "../models/coffee";
import Order from "../models/order";
import { ICoffee } from "../utils/types";

const calculateTotalPrice = async (items: string[]) => {
  let totalPrice = 0;
  for (const itemId of items) {
    const coffee = await Coffee.findById(itemId);
    if (coffee) {
      totalPrice += coffee.price;
    } else {
      throw new Error(`Coffee item with id ${itemId} not found`);
    }
  }
  return totalPrice;
};

const createOrder = async (userId: string, items: string[]) => {
  const totalPrice = await calculateTotalPrice(items);
  const order = new Order({
    userId,
    items,
    total_price: totalPrice,
    status: "Pending",
  });
  try {
    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Error creating order");
  }
};

export default { createOrder };
