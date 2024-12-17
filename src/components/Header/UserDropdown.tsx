// components/UserDropdown.tsx
import Link from 'next/link';
import { SignOutButton } from './SignOutButton';
import { getSession } from '@/lib/firebase/session';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  User,
  Settings, 
  CreditCard,
  LayoutDashboard,
  Globe,
  UserPlus
} from "lucide-react";

export default async function UserDropdown() {
  const session = await getSession();
  const ADMIN_ROLES = ['Administrator', 'Moderator'] as const;

  if (!session) {
    return (
      <div className="flex items-center gap-4">
      <Link href="/signin" className="hidden md:block">
        <Button variant="ghost" className="font-medium">
          Sign in
        </Button>
      </Link>
      <Link href="/signup">
        <Button className="hidden md:flex font-semibold">
          Free Trial
        </Button>
        <Button 
          size="icon" 
          variant="ghost"
          className="md:hidden"
        >
          <UserPlus className="!h-6 !w-6" />
        </Button>
      </Link>
    </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none cursor-pointer bg-gray-100 rounded-full">
          <Avatar className="w-9 h-9">
            {session.profileImage ? (
              <AvatarImage 
                src={session.profileImage} 
                alt={session.firstName} 
              />
            ) : (
              <AvatarFallback className="bg-indigo-100 text-indigo-900">
                {`${session.firstName?.charAt(0)?.toUpperCase() || ''}${session.lastName?.charAt(0)?.toUpperCase() || ''}`}
              </AvatarFallback>
            )}
          </Avatar>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56 mt-2" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">
              {session.firstName} {session.lastName}
            </p>
            <p className="text-xs text-muted-foreground">
              {session.email}
            </p>
            {ADMIN_ROLES.includes(session.role) && (
  
            <p className="text-xs text-muted-foreground">
              {session.role}
            </p>
          
            )}
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem className="gap-3 cursor-pointer">
              <User />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          
          <Link href="/billing">
            <DropdownMenuItem className="gap-3 cursor-pointer">
              <CreditCard />
              <span>Billing</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          
          <Link href="/settings">
            <DropdownMenuItem className="gap-3 cursor-pointer">
              <Settings />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          
          {ADMIN_ROLES.includes(session.role) && (
            <Link href="/dashboard">
              <DropdownMenuItem className="gap-3 cursor-pointer">
                <LayoutDashboard />
                <span>Admin Panel</span>
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        {ADMIN_ROLES.includes(session.role) && (
          <Link href="/" target="_blank" rel="noopener">
            <DropdownMenuItem className="gap-3 cursor-pointer">
              <Globe />
              <span>Website</span>
              <DropdownMenuShortcut>↗</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuSeparator />
        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}