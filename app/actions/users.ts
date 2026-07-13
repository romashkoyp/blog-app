"use server"

import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getUserByUsername } from "../services/users"
import { redirect } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { revalidatePath } from "next/cache"

export const generateToken = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const token = await bcrypt.hash(Date.now().toString(), 10)
  console.log("Generated token from use server component:", token)
  await db.update(users).set({ token }).where(eq(users.id, user.id))
  revalidatePath("/me")
  return token
}

export const registerUser = async (
  prevState: { username: string, name: string, password: string, confirmPassword: string, success?: boolean },
  formData: FormData) => {
    const username = (formData.get("username") as string)?.trim()
    const name = (formData.get("name") as string)?.trim()
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    const errors: { [key: string]: string } = {}

    if (!username || username.length < 4) {
      errors.username = "Username must be at least 4 characters"
    }

    const existingUser = await getUserByUsername(username)
    if (existingUser) {
      errors.username = "Username already exists"
    }

    if (!password || password.length < 4) {
      errors.password = "Password must be at least 4 characters"
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    if (Object.keys(errors).length > 0) {
      return { errors, success: false, values: { username, name, password, confirmPassword } }
    }

    const passwordHash = await bcrypt.hash(password, 10)

    await db.insert(users).values({ username, name, passwordHash })
    return { errors: {}, success: true, values: { username, name, password, confirmPassword } }
  }