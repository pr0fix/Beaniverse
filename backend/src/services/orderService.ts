import mongoose from "mongoose";
import Order from "../models/order";
import calculateTotalPrice from "../utils/calculateOrderPrice";
import {
  EditDetailsRequestBody,
  UpdateStatusRequestBody,
} from "../utils/types";

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
  try {
    const orders = await Order.find({ userId: userId });
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

const updateOrderStatus = async ({
  orderId,
  newStatus,
}: UpdateStatusRequestBody) => {
  try {
    const orderToUpdate = await Order.findByIdAndUpdate(orderId, {
      status: newStatus,
      updatedAt: Date.now(),
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

const editOrderDetails = async ({
  orderId,
  updatedDetails,
}: EditDetailsRequestBody) => {
  try {
    const orderToEdit = await Order.findByIdAndUpdate(orderId, updatedDetails, {
      updatedAt: Date.now(),
    });

    if (!orderToEdit) {
      throw new Error("Order to edit not found");
    }

    return orderToEdit;
  } catch (error) {
    console.error("Error editing order details:", error);
    throw new Error("Error editing order details");
  }
};

export default {
  getAllOrders,
  getOrdersByUserId,
  createOrder,
  updateOrderStatus,
  editOrderDetails,
};
