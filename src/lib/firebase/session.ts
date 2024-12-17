import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

interface SessionUser {
  uid: string;
  email: string | null;
  firstName: string;
  lastName: string;
  profileImage: string;
  role: string;
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) return null;

    // Verify session cookie
    const decodedClaim = await adminAuth.verifySessionCookie(sessionCookie, true);
    const user = await adminAuth.getUser(decodedClaim.uid);
    
    // Get additional user data from Firestore
    const userDoc = await adminDb.collection('users').doc(user.uid).get();
    const userData = userDoc.data();

    return {
      uid: user.uid,
      email: user.email ?? null,  // Convert undefined to null
      firstName: userData?.firstName ?? '',  // Convert undefined to empty string
      lastName: userData?.lastName ?? '',    // Convert undefined to empty string
      profileImage: userData?.profileImage ?? '',  // Convert undefined to empty string
      role: userData?.role ?? ''    // Convert undefined to empty string
    };
  } catch (error) {
    console.error('Session verification error:', error);
    return null;
  }
}