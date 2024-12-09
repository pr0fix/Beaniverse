import React from "react";
import Home from "../components/Products";
import Login from "../components/auth/Login";
import AdminDashboard from "../components/admin/AdminDashboard";

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
    path: "/admin",
    component: AdminDashboard,
    protected: true,
    adminOnly: true,
  },
];
