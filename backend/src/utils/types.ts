import { Request } from "express";

type Role = "admin" | "user";

type Status = "Pending" | "Accepted" | "Preparing" | "Delivered" | "Cancelled";

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
  category: string;
}

export interface RequestWithUser extends Request {
  user?: any;
}
