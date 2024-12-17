import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import UserDropdown from '@/components/Header/UserDropdown';
import NotificationsDropdown from './NotificationsDropdown';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 w-full h-14 flex items-center justify-between border-b bg-background">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4" />
        <span className="text-lg font-semibold">Dashboard</span>
      </div>
      <div className="flex items-center gap-4 px-4">
        <NotificationsDropdown />
        <UserDropdown />
      </div>
    </header>
  );
}

