"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"
import { getUserByUsername } from "../services/users"

export const registerUser = async (prevState: any, formData: FormData) => {
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
    return { errors, values: { username, name, password, confirmPassword } }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}