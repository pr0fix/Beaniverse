import { Request } from "express";
import mongoose from "mongoose";

type Role = "admin" | "user";

export type Status = "Pending" | "Accepted" | "Preparing" | "Delivered" | "Cancelled";

export interface IUser {
  username: string;
  name: string;
  role: Role;
  passwordHash: string;
}

export interface IOrder {
  userId: string;
  items: string[];
  total_price: number;
  status: Status;
}

export interface ICoffee {
  name: string;
  price: number;
  description: string;
  type: string;
  stock: number;
}

export interface RequestWithUser extends Request {
  user?: any;
}

export interface UpdateStatusRequestBody {
  orderId: mongoose.Types.ObjectId;
  newStatus: Status;
}

export interface EditDetailsRequestBody {
  orderId: string;
  updatedDetails: Partial<IOrder>;
}