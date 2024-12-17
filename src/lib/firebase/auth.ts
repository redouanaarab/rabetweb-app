// src/lib/firebase/auth.ts
import { auth, db } from './config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { cookies } from 'next/headers';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export async function createUser(email: string, password: string, name: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store additional user data in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
      role: 'user',
      createdAt: new Date().toISOString()
    });

    // Create session cookie
    const idToken = await user.getIdToken();
    const cookieStore = await cookies();
    cookieStore.set('session', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 5 // 5 days
    });

    return user;
  } catch (error: any) {
    throw new AuthError(error.message);
  }
}

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create session cookie
    const idToken = await user.getIdToken();
    const cookieStore = await cookies();
    cookieStore.set('session', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 5 // 5 days
    });

    return user;
  } catch (error: any) {
    throw new AuthError(error.message);
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
    const cookieStore = await cookies();
    cookieStore.delete('session');
  } catch (error: any) {
    throw new AuthError(error.message);
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  
  if (!session) {
    return null;
  }

  try {
    // Verify the session cookie with Firebase Admin SDK
    // You'll need to implement this using Firebase Admin SDK
    return null; // Placeholder
  } catch (error) {
    return null;
  }
}