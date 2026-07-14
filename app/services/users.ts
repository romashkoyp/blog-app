import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users, blogs, readingList } from "@/db/schema"

export const getUsers = async () => {
  return db.query.users.findMany()
}

export const getUserById = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  })
}

export const getUserByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
  })
}

export const getBlogsByUserId = async (userId: number) => {
  return db.query.blogs.findMany({
    where: eq(blogs.userId, userId),
  })
}

export const getUserWithBlogs = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    with: { blogs: true },
  })
}

export const getUserWithReadingList = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      readingList: {
        with: {
          blog: true,
        },
      },
    },
  })
}