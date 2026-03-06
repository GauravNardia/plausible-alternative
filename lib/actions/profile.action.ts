"use server"
import { signOut } from '@/auth';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache';

interface UpdateEmailParams {
  userId: string
  newEmail: string
}

export async function updateEmail({ userId, newEmail }: UpdateEmailParams): Promise<{ success: boolean; error?: string }> {
  if (!newEmail || !newEmail.includes('@')) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  try {
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, newEmail))
      .limit(1)

    if (existing.length > 0 && existing[0].id !== userId) {
      return { success: false, error: 'This email is already in use.' }
    }

    await db
      .update(users)
      .set({ email: newEmail })
      .where(eq(users.id, userId))

    revalidatePath('/profile') // 👈 this busts the cache so the page re-fetches fresh data

    return { success: true }
  } catch (err) {
    console.error('[updateEmail]', err)
    return { success: false, error: 'Failed to update email. Please try again.' }
  }
}

export async function deleteAccount(userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    await db
      .delete(users)
      .where(eq(users.id, userId))

    await signOut({ redirectTo: '/sign-in' })

    return { success: true }
  } catch (err) {
    console.error('[deleteAccount]', err)
    return { success: false, error: 'Failed to delete account. Please try again.' }
  }
}