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
