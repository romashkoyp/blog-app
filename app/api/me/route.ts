// app/api/me/route.ts
import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export const GET = async () => {
  const headersList = await headers()
  const authorization = headersList.get("authorization")

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const token = authorization.substring(7)
  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
    with: {
      blogs: true
    }
  })

  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    name: user.name,
    blogs: user.blogs
  })
}


