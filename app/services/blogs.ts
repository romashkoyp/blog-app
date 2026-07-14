import { eq, sql, ilike, desc, and } from "drizzle-orm"
import { db } from "../../db"
import { blogs, readingList } from "../../db/schema"
import { getCurrentUser } from "./session"

export const getBlogs = async () => {
  return db.query.blogs.findMany()
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const sortBlogsByLikes = async () => {
  return db.query.blogs.findMany({
    orderBy: [desc(blogs.likes)]
  })
}

export const addBlog = async (content: string, author: string, title: string, url: string) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  await db.insert(blogs).values({ content, author, title, url, likes: 0, userId: user.id })
}

export const likeBlog = async (id: number) => {
  return db
    .update(blogs)
    .set({ likes: sql<number>`${blogs.likes} + 1` })
    .where(eq(blogs.id, id))
}

export const filterBlogsByTitle = async (title: string) => {
  return db.query.blogs.findMany({
    where: ilike(blogs.title, `%${title}%`), //ilike - case insensitive search
  })
}

export const addToReadingList = async (blogId: number) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  const existing = await db.query.readingList.findFirst({
    where: (rl, { and, eq }) => and(eq(rl.userId, user.id), eq(rl.blogId, blogId)),
  })

  if (existing) {
    return
  }

  return db
    .insert(readingList)
    .values({
      userId: user.id,
      blogId,
      read: false,
    })
}

export const updateReadingList = async (blogId: number) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  const existing = await db.query.readingList.findFirst({
    where: (rl, { and, eq }) => and(eq(rl.userId, user.id), eq(rl.blogId, blogId)),
  })

  if (existing?.read) {
    return
  }

  return db
    .update(readingList)
    .set({ read: true })
    .where(and(eq(readingList.userId, user.id), eq(readingList.blogId, blogId)))
}