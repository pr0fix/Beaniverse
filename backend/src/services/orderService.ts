import mongoose from "mongoose";
import Order from "../models/order";
import calculateTotalPrice from "../utils/calculateOrderPrice";
import { Status } from "../utils/types";

const getAllOrders = async () => {
  try {
    const orders = await Order.find({});
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Error fetching coffee items");
  }
};

const getOrdersByUserId = async (userId: mongoose.Types.ObjectId) => {
  console.log(userId);
  try {
    const orders = await Order.find({ "userId": userId });
    console.log(orders)
    return orders;
  } catch (error) {
    console.error(`Error fetching orders with id ${userId}:`, error);
    throw new Error("Error fetching user orders");
  }
};

const createOrder = async (
  userId: mongoose.Types.ObjectId,
  items: string[]
) => {
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

const updateOrderStatus = async (
  orderId: mongoose.Types.ObjectId,
  newStatus: Status
) => {
  try {
    const orderToUpdate = await Order.findByIdAndUpdate(orderId, {
      status: newStatus,
    });

    if (!orderToUpdate) {
      throw new Error("Order to update does not exist");
    }

    return orderToUpdate;
  } catch (error) {
    console.error("Error updating order status: ", error);
    throw new Error("Error updating order status");
  }
};

export default {
  getAllOrders,
  getOrdersByUserId,
  createOrder,
  updateOrderStatus,
};
