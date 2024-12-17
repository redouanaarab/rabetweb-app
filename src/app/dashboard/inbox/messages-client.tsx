// src/app/dashboard/mail/messages-client.tsx
"use client";
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/config';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Mail, 
  Search, 
  Trash2,
  MailOpen,
  Reply,
  CheckCircle2,
  Archive,
  AlertCircle,
  Filter,
  MoveLeft
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Message {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  isArchived: boolean;
  createdAt: {
    seconds: number;
  };
}

interface Props {
  initialMessages: Message[];
}

export default function MessagesClient({ initialMessages }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);

  useEffect(() => {
    const messagesQuery = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>;
      case 'read':
        return <Badge variant="secondary" className="hover:bg-gray-200">Read</Badge>;
      case 'replied':
        return <Badge className="bg-green-500 hover:bg-green-600">Replied</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else if (days < 7) {
      return date.toLocaleDateString('en-US', {
        weekday: 'short'
      });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const formatDetailedDate = (seconds: number) => {
    return new Date(seconds * 1000).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleMessageClick = async (message: Message) => {
    setSelectedMessage(message);
    if (message.status === 'new') {
      await updateDoc(doc(db, 'messages', message.id), {
        status: 'read'
      });
    }
  };

  const handleReply = async () => {
    if (selectedMessage) {
      await updateDoc(doc(db, 'messages', selectedMessage.id), {
        status: 'replied'
      });
    }
  };

  const handleArchive = async () => {
    if (selectedMessage) {
      await updateDoc(doc(db, 'messages', selectedMessage.id), {
        isArchived: true
      });
    }
  };

  const handleUnarchive = async () => {
    if (selectedMessage) {
      await updateDoc(doc(db, 'messages', selectedMessage.id), {
        isArchived: false
      });
    }
  };

  const handleDelete = async (message: Message | null) => {
    if (message) {
      setMessageToDelete(message);
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (messageToDelete) {
      await deleteDoc(doc(db, 'messages', messageToDelete.id));
      setDeleteDialogOpen(false);
      setMessageToDelete(null);
      if (selectedMessage?.id === messageToDelete.id) {
        setSelectedMessage(null);
      }
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    if (statusFilter === 'archived') {
      matchesFilter = message.isArchived;
    } else if (statusFilter === 'all') {
      matchesFilter = !message.isArchived;
    } else {
      matchesFilter = message.status === statusFilter && !message.isArchived;
    }
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-[calc(100vh-3.5rem)] bg-white overflow-hidden">
      {/* Left Sidebar - Message List */}
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-5 w-5 text-blue-600" />
            <h2 className="font-semibold text-lg">Inbox</h2>
            <Badge variant="default" className="ml-auto bg-blue-500">
              {messages.filter(m => m.status === 'new' && !m.isArchived).length} new
            </Badge>
          </div>
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-8 bg-gray-50 focus:bg-white transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="text-sm">
                    <Filter className="h-4 w-4 mr-2" />
                    {statusFilter === 'all' ? 'All Messages' : 
                     statusFilter === 'archived' ? 'Archived' :
                     statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                    All Messages
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('new')}>
                    New
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('read')}>
                    Read
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('replied')}>
                    Replied
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('archived')}>
                    Archived
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {searchTerm && (
                <span className="text-sm text-muted-foreground">
                  {filteredMessages.length} results
                </span>
              )}
            </div>
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100vh-13rem)]">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => handleMessageClick(message)}
                className={`p-4 border-b cursor-pointer hover:bg-slate-50 transition-colors ${
                  selectedMessage?.id === message.id ? 'bg-slate-50' : ''
                } ${message.status === 'new' ? 'font-semibold' : ''}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate">{message.fullName}</span>
                      {getStatusBadge(message.status)}
                    </div>
                    <div className="text-sm text-muted-foreground truncate mt-1">
                      {message.subject}
                    </div>
                    <div className="text-xs text-muted-foreground truncate mt-1">
                      {message.message.substring(0, 100)}...
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {formatDate(message.createdAt.seconds)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
              <AlertCircle className="h-8 w-8 mb-4" />
              <p className="font-medium">No messages found</p>
              <p className="text-sm mt-1">Try adjusting your search or filter</p>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Right Side - Message Content */}
      <div className="flex-1 flex flex-col">
        {selectedMessage ? (
          <>
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{selectedMessage.subject}</h2>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleReply}
                    disabled={selectedMessage.status === 'replied'}
                    className="transition-colors"
                  >
                    {selectedMessage.status === 'replied' ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Replied
                      </>
                    ) : (
                      <>
                        <Reply className="h-4 w-4 mr-2" />
                        Mark as Replied
                      </>
                    )}
                  </Button>
                  {selectedMessage.isArchived ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleUnarchive}
                    >
                      <MoveLeft className="h-4 w-4 mr-2" />
                      Unarchive
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleArchive}
                    >
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(selectedMessage)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 text-sm text-muted-foreground bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="font-medium text-foreground">From: </span>
                    {selectedMessage.fullName}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Email: </span>
                    {selectedMessage.email}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-foreground">Date: </span>
                  {formatDetailedDate(selectedMessage.createdAt.seconds)}
                </div>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-6">
              <div className="max-w-3xl mx-auto">
                <p className="whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>
            </ScrollArea>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <MailOpen className="h-12 w-12 mb-4" />
            <p className="font-medium">Select a message to read</p>
            <p className="text-sm mt-1">Choose from your inbox on the left</p>
          </div>
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the message.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}