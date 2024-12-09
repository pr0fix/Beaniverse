export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  name: string;
  username: string;
  role: string;
}

export interface Coffee {
  id: string;
  name: string;
  price: number;
  description: string;
  type: string;
  stock: number;
}

export type NewCoffee = Omit<Coffee, "id">;
