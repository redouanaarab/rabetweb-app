"use client";
import React, { useState, useEffect } from 'react';
import { Bell, MailPlus, Check } from 'lucide-react';
import { db } from '@/lib/firebase/config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";

const NotificationsDropdown = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const notificationsQuery = query(
      collection(db, 'messages'),
      where('status', '==', 'new')
    );

    const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      setUnreadCount(snapshot.docs.length);
    });

    return () => unsubscribe();
  }, []);

  const handleNotificationClick = () => {
    router.push('/dashboard/inbox');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="focus:outline-none">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover:bg-slate-100 transition-all duration-200 h-9 w-9 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <Bell className={cn(
              "!h-5 !w-5 transition-colors duration-200",
              unreadCount > 0 ? "text-slate-900" : "text-slate-500"
            )} />
            {unreadCount > 0 && (
              <Badge 
                className="absolute top-0.5 right-0.5 h-[18px] min-w-[18px] px-1 flex items-center justify-center bg-red-500 hover:bg-red-500 text-[10px] border-0"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[320px] p-0 bg-white shadow-lg rounded-lg border-slate-200 mt-2">
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-slate-900" />
            <span className="font-medium text-slate-900 text-sm">Notifications</span>
          </div>
          {unreadCount > 0 && (
            <Badge 
              className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-0 px-2 py-0.5 text-xs font-medium"
            >
              {unreadCount} new
            </Badge>
          )}
        </div>
        
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          {unreadCount > 0 ? (
            <div 
              onClick={handleNotificationClick}
              className="p-3 hover:bg-slate-50 cursor-pointer transition-colors duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 bg-slate-100 rounded-full p-2">
                  <MailPlus className="h-4 w-4 text-slate-700" />
                </div>
                <div className="flex-1 space-y-0.5 pt-0.5">
                  <p className="text-sm font-medium text-slate-900">Inbox Updates</p>
                  <p className="text-xs text-slate-500">
                    You have {unreadCount} new {unreadCount === 1 ? 'message' : 'messages'} to review
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-3 py-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="bg-slate-50 rounded-full p-2.5">
                  <Check className="h-5 w-5 text-slate-400" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-slate-900 mb-1">All Caught Up!</h3>
              <p className="text-xs text-slate-500">
                Check back later for new notifications
              </p>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;