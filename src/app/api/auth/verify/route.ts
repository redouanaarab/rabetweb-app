// src/app/api/auth/verify/route.ts
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return NextResponse.json({ error: 'No session found' }, { status: 401 });
    }

    // التحقق من صحة الـ session cookie
    const decodedClaims = await adminAuth.verifySessionCookie(
      sessionCookie.value, 
      true
    );

    // جلب بيانات المستخدم من Firestore
    const userDoc = await adminDb.collection('users').doc(decodedClaims.uid).get();
    const userData = userDoc.data();

    if (!userData || (userData.role !== 'Administrator' && userData.role !== 'Moderator')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ 
      success: true,
      role: userData.role
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
  }
}