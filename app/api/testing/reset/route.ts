import { db } from "@/db"
import { users, blogs, readingList } from "@/db/schema"
import { NextResponse } from "next/server"

export const DELETE = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  await db.delete(readingList);
  console.log("1. Reading list table reset");
  await db.delete(blogs);
  console.log("2. Blogs table reset");
  await db.delete(users);
  console.log("3. Users table reset");
  return NextResponse.json({ message: "All data reset" }, { status: 200 })
}