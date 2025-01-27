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
