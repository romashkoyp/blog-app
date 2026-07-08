import { eq, sql, ilike, desc } from "drizzle-orm"
import { db } from "../../db"
import { blogs, users } from "../../db/schema"

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
  const user = await db.query.users.findFirst({
    orderBy: sql`RANDOM()`,
  })
  
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