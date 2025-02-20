import React from "react";
import Home from "../components/e-commerce/Products";
import Login from "../components/auth/Login";
import AdminDashboard from "../components/admin/AdminDashboard";
import Products from "../components/e-commerce/Products";
import SignUp from "../components/auth/SignUp";
import Cart from "../components/e-commerce/Cart";

interface RouteConfig {
  path: string;
  component: React.ComponentType;
  layout?: React.ComponentType;
  protected?: boolean;
  adminOnly?: boolean;
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    component: Home,
    protected: false,
  },
  {
    path: "/login",
    component: Login,
    protected: false,
  },
  {
    path: "/signup",
    component: SignUp,
    protected: false,
  },
  {
    path: "/admin",
    component: AdminDashboard,
    protected: true,
    adminOnly: true,
  },
  {
    path: "/products",
    component: Products,
    protected: false,
  },
  {
    path: "/cart",
    component: Cart,
    protected: true,
  },
];
