// components/SignOutButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from "lucide-react";
import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout', {
        method: 'POST',
      });
      router.push('/signin');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}