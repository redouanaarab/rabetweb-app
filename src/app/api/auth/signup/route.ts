// src/app/api/auth/signup/route.ts
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName } = await request.json();

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }

    // Create user with Firebase Admin
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`
    });

    // استخدام toISOString() لتسجيل التاريخ
    const createdAt = new Date().toISOString();

    // Store additional user data
    await adminDb.collection('users').doc(userRecord.uid).set({
      firstName,
      lastName,
      username: email.split('@')[0],
      email,
      role: 'User',
      emailVerified: false,
      createdAt, // تسجيل التاريخ بصيغة ISO
      lastLogin: null,
      bio: '',
      phoneNumber: '',
      website: '',
      profileImage: ''
    });

    return NextResponse.json({ 
      success: true, 
      message: 'تم إنشاء الحساب بنجاح. يمكنك الآن تسجيل الدخول.' 
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error.message || 'حدث خطأ أثناء إنشاء الحساب' },
      { status: 400 }
    );
  }
}