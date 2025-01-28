'use client';

import { openAuthDialog } from '@/components/dialogs/auth-dialog';
import ProfileDropdown from '@/components/dropdowns/profile-dropdown';
import { Skeleton } from '@/components/ui/skeleton';
import Avatar from '@/components/utils/avatar';
import { logo } from '@/components/utils/logo';
import { useProfile } from '@/queries/use-profile';
import { ProgressLink } from '@jodd/next-top-loading-bar';
import { LogInIcon } from 'lucide-react';
import Search from './search';

export default function Header() {
  const { data: profile, isFetched } = useProfile();

  return (
    <div className="max-width section-padding-x fixed left-0 top-0 z-30 w-full border-b border-border/50 text-sm text-muted-foreground filter backdrop-blur-2xl">
      <header className="cont flex h-16 items-center justify-between">
        <ProgressLink href="/" className="text-3xl">
          {logo}
        </ProgressLink>

        <div className="hidden w-full md:mx-10 md:block lg:mx-20">
          <Search />
        </div>

        <div className="flex items-center space-x-6 md:space-x-8">
          {profile && (
            <ProfileDropdown>
              <button>
                <Avatar
                  src={profile?.image}
                  unreadNotifications={profile.totalUnreadNotifications}
                />
              </button>
            </ProfileDropdown>
          )}

          {!isFetched && !profile && <Skeleton className="size-8 rounded-full" />}

          {isFetched && !profile && (
            <button
              className="flex items-center space-x-2 hover:text-foreground"
              onClick={() => openAuthDialog('login')}
            >
              <span className="whitespace-nowrap">Login</span>
              <LogInIcon className="size-4" />
            </button>
          )}
        </div>
      </header>

      <div className="px-4 pb-2 md:hidden">
        <Search />
      </div>
    </div>
  );
}
