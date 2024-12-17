import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    // جلب المستخدم من Auth
    const user = await adminAuth.getUserByEmail(email);
    const userDoc = await adminDb.collection('users').doc(user.uid).get();
    const userData = userDoc.data();

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 5 * 1000 // 5 days
    });

    // تحديث آخر تسجيل دخول
    await adminDb.collection('users').doc(user.uid).update({
      lastLogin: new Date().toISOString()
    });

    const cookieStore = await cookies();
    cookieStore.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 5 // 5 days
    });

    return NextResponse.json({ 
      success: true,
      role: userData.role,
      redirectUrl: '/' // تحويل جميع المستخدمين إلى الصفحة الرئيسية
    });

  } catch (error: any) {
    console.error('Signin error:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}