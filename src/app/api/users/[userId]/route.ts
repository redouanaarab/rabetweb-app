// src/app/api/users/[userId]/route.ts
import { adminDb, adminAuth } from '@/lib/firebase/admin';
import { NextRequest, NextResponse } from 'next/server';

// Helper function to handle errors
function handleError(error: unknown) {
  console.error('API Error:', error);
  return NextResponse.json(
    {
      success: false,
      message: 'Operation failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    },
    { status: 500 }
  );
}

// Get single user
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    // Validate user ID
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get user data from Firestore
    const userDoc = await adminDb.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();

    return NextResponse.json({ 
      success: true,
      user: {
        id: userDoc.id,
        ...userData
      }
    });
    
  } catch (error) {
    return handleError(error);
  }
}

// Update user
export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const updateData = await request.json();

    // Validate user ID
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Check if user exists in Firestore
    const userDoc = await adminDb.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return NextResponse.json(
        { success: false, message: 'User not found in database' },
        { status: 404 }
      );
    }

    // Check if user exists in Auth
    try {
      await adminAuth.getUser(userId);
    } catch (authError) {
      return NextResponse.json(
        { success: false, message: 'User not found in authentication' },
        { status: 404 }
      );
    }

    // Sanitize the update data
    const sanitizedData = {
      firstName: updateData.firstName,
      lastName: updateData.lastName,
      email: updateData.email,
      username: updateData.username,
      role: updateData.role,
      phoneNumber: updateData.phoneNumber,
      bio: updateData.bio,
      website: updateData.website,
      updatedAt: new Date().toISOString(),
    };

    // If email is being updated, update it in Authentication
    if (updateData.email) {
      await adminAuth.updateUser(userId, {
        email: updateData.email,
      });
    }

    // Update the user in Firestore
    await adminDb.collection('users').doc(userId).update(sanitizedData);

    // Get the updated user data
    const updatedDoc = await adminDb.collection('users').doc(userId).get();
    const updatedUser = updatedDoc.data();

    return NextResponse.json({ 
      success: true,
      message: 'User updated successfully',
      user: {
        id: userId,
        ...updatedUser
      }
    });
    
  } catch (error) {
    if (error instanceof Error && 'code' in error) {
      const firebaseError = error as { code: string; message: string };
      if (firebaseError.code === 'auth/email-already-exists') {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Email address is already in use by another account',
            error: firebaseError.code
          },
          { status: 400 }
        );
      }
    }
    return handleError(error);
  }
}

// Toggle user status (enable/disable)
export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const { disabled } = await request.json();

    // Validate user ID
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Check if user exists in Auth
    try {
      await adminAuth.getUser(userId);
    } catch (authError) {
      return NextResponse.json(
        { success: false, message: 'User not found in authentication' },
        { status: 404 }
      );
    }

    // Update user status in Authentication
    await adminAuth.updateUser(userId, {
      disabled: disabled
    });

    // Update user status in Firestore
    await adminDb.collection('users').doc(userId).update({
      disabled: disabled,
      updatedAt: new Date().toISOString()
    });

    // Get the updated user data
    const updatedDoc = await adminDb.collection('users').doc(userId).get();
    const updatedUser = updatedDoc.data();

    return NextResponse.json({ 
      success: true,
      message: `User ${disabled ? 'disabled' : 'enabled'} successfully`,
      user: {
        id: userId,
        ...updatedUser
      }
    });
    
  } catch (error) {
    if (error instanceof Error && 'code' in error) {
      const firebaseError = error as { code: string };
      if (firebaseError.code === 'auth/user-not-found') {
        return NextResponse.json(
          { 
            success: false, 
            message: 'User not found in authentication system',
            error: firebaseError.code
          },
          { status: 404 }
        );
      }
    }
    return handleError(error);
  }
}

// Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    // Validate user ID
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Try to delete from both Authentication and Firestore
    try {
      // Delete from Authentication first
      await adminAuth.deleteUser(userId);

      // Then delete from Firestore
      await adminDb.collection('users').doc(userId).delete();

      return NextResponse.json({ 
        success: true,
        message: 'User deleted successfully from both authentication and database',
        deletedUserId: userId
      });
    } catch (deleteError) {
      // If it's an auth error, try to delete from Firestore anyway
      if (deleteError instanceof Error && 'code' in deleteError) {
        const firebaseError = deleteError as { code: string };
        if (firebaseError.code === 'auth/user-not-found') {
          // Try to delete from Firestore
          await adminDb.collection('users').doc(userId).delete();
          
          return NextResponse.json({ 
            success: true,
            message: 'User deleted from database (not found in authentication)',
            deletedUserId: userId
          });
        }
      }
      throw deleteError;
    }
  } catch (error) {
    if (error instanceof Error && 'code' in error) {
      const firebaseError = error as { code: string };
      switch (firebaseError.code) {
        case 'auth/user-not-found':
          return NextResponse.json(
            { 
              success: false, 
              message: 'User not found in authentication system',
              error: firebaseError.code
            },
            { status: 404 }
          );
        case 'permission-denied':
          return NextResponse.json(
            { 
              success: false, 
              message: 'Permission denied to delete user',
              error: firebaseError.code
            },
            { status: 403 }
          );
        default:
          return NextResponse.json(
            { 
              success: false, 
              message: 'Failed to delete user',
              error: firebaseError.code
            },
            { status: 500 }
          );
      }
    }
    return handleError(error);
  }
}