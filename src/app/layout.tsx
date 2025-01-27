import AuthDialog from '@/components/dialogs/auth-dialog';
import RequestLoginOtpDialog from '@/components/dialogs/login-with-otp-dialog';
import LogoutDialog from '@/components/dialogs/logout-dialog';
import ProfileDialog from '@/components/dialogs/profile-dialog';
import UpdatePasswordDialog from '@/components/dialogs/update-password-dialog';
import UpdateProfileDialog from '@/components/dialogs/update-profile-dialog';
import QueryProvider from '@/providers/query-provider';
import { LoadingBar } from '@jodd/next-top-loading-bar';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const geist = Geist({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '900'] });
export const metadata: Metadata = {
  title: 'GorcEasy'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <QueryProvider>
          <LoadingBar waitingTime={200} color="hsl(var(--brand))" />

          <Toaster toastOptions={{ duration: 3000 }} theme="dark" richColors closeButton />

          {children}

          <ProfileDialog />
          <UpdateProfileDialog />
          <AuthDialog />
          <LogoutDialog />
          <RequestLoginOtpDialog />
          <UpdatePasswordDialog />
        </QueryProvider>
      </body>
    </html>
  );
}
