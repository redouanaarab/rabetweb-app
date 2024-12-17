import { adminDb } from '@/lib/firebase/admin';
import MessagesClient from './messages-client';

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

export const revalidate = 0;

async function getMessages(): Promise<Message[]> {
  try {
    const messagesRef = adminDb.collection('messages');
    const messagesSnapshot = await messagesRef
      .orderBy('createdAt', 'desc')
      .get();

    const messages = messagesSnapshot.docs.map(doc => {
      const data = doc.data();
      // تحويل Timestamp إلى كائن بسيط
      return {
        id: doc.id,
        fullName: data.fullName,
        email: data.email,
        subject: data.subject,
        message: data.message,
        isArchived: data.isArchived ?? false,
        status: data.status,
        createdAt: {
          seconds: data.createdAt?._seconds || 0
        }
      };
    });

    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw new Error('Failed to fetch messages');
  }
}

export default async function MessagesPage() {
  const messages = await getMessages();

  return <MessagesClient initialMessages={messages} />;
}