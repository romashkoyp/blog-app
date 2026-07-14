import { auth } from "@/auth"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export const getCurrentUser = async () => {
  const session = await auth()
  console.log("getCurrentUser session:", JSON.stringify(session))
  if (!session?.user?.email) {
    return null
  }

  const dbUser = await db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  })
  console.log("getCurrentUser dbUser:", JSON.stringify(dbUser))
  return dbUser
}