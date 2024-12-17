// src/app/dashboard/users/page.tsx
import { adminDb } from '@/lib/firebase/admin';
import { UsersTable } from './UsersTable';
import { Timestamp } from 'firebase-admin/firestore';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  lastLogin: string;
  createdAt: string;
  emailVerified: boolean;
  bio: string;
  phoneNumber: string;
  profileImage: string;
  updatedAt: string;
  website: string;
}

function toISOString(date: any): string {
  if (!date) return '';
  
  try {
    if (date instanceof Timestamp) {
      return date.toDate().toISOString();
    }
    return new Date(date).toISOString();
  } catch {
    return '';
  }
}

async function getUsers() {
  try {
    const snapshot = await adminDb.collection('users').get();
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      
      return {
        id: doc.id,
        ...data,
        createdAt: toISOString(data.createdAt),
        updatedAt: toISOString(data.updatedAt),
        lastLogin: toISOString(data.lastLogin)
      };
    }) as User[];
    
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="p-4">
      <UsersTable initialData={users} /> {/* Changed from users to initialData */}
    </div>
  );
}