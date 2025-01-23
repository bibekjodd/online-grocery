import { HomeIcon, LogOutIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { openLogoutDialog } from '../dialogs/logout-dialog';
import { openProfileDialog } from '../dialogs/profile-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';

export default function ProfileDropdown({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Account</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={openProfileDialog}
            className="flex flex-1 cursor-pointer items-center"
          >
            <UserIcon className="size-3.5" />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="flex w-full cursor-pointer items-center">
              <HomeIcon className="size-3.5" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={openLogoutDialog}
            className="flex flex-1 cursor-pointer items-center"
          >
            <LogOutIcon className="size-3.5" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
