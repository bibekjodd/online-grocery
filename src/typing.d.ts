type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  image: string | null;
  phone: number | null;
  lastOnline: string;
  createdAt: string;
  isVerified: boolean;
};

export interface Product {
  id?: string;
  title?: string;
  description?: string;
  image?: string | null;
  category?: 'fruits' | 'vegetables';
  price?: number;
  stock?: number;
  discount?: number;
  ownerId?: string;
  createdAt?: string;
}

type UserProfile = User & {
  authSource: 'credentials' | 'google';
  lastNotificationReadAt: string;
  totalUnreadNotifications: number;
};

type Product = {
  id: string;
  title: string;
  image: string | null;
  category: 'fruits' | 'vegetables';
  description: string | null;
  stock: number;
  ownerId: string;
  price: number;
  discount: number;
  createdAt: string;
  owner: User;
};

// types.ts
export interface Product {
  title: string;
  description: string;
  image: string | null;
  category: 'fruits' | 'vegetables';
  price: number;
  stock: number;
  discount: number;
}

export type ProductFormData = {
  title: string;
  description: string;
  image: string;
  category: string;
  price: string;
  stock: string;
  discount: string;
}

export interface FormErrors {
  title?: string;
  description?: string;
  image?: string;
  category?: string;
  price?: string;
  stock?: string;
  discount?: string;
}
