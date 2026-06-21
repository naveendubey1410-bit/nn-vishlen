export type Role = 'admin' | 'user';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  size: string[];
  description: string;
  createdAt: number;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  role: Role;
}
