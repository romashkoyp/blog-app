"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeBlog, addToReadingList, updateReadingList } from "../services/blogs"
import { auth } from "@/auth"

export const createBlog = async (
  prevState: {
    errors: Record<string, string>
    success: boolean
    values: { title: string; author: string; url: string; content: string }
  },
  formData: FormData) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const content = formData.get("content") as string
  const author = formData.get("author") as string
  const title = formData.get("title") as string
  const url = formData.get("url") as string

  const errors: { [key: string]: string } = {}
  if (!title || title.length < 5) {
    errors.title = "Title must be at least 5 characters"
  }
  if (!author || author.length < 5) {
    errors.author = "Author must be at least 5 characters"
  }
  if (!url || url.length < 5) {
    errors.url = "URL must be at least 5 characters"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, success: false, values: { title, author, url, content } }
  }

  await addBlog(content, author, title, url)
  revalidatePath("/blogs")
  return { errors: {}, success: true, values: { title, author, url, content } }

}

export const likeOneBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await likeBlog(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}

export const filterByTitle = async (formData: FormData) => {
  const title = formData.get("title") as string
  redirect(`/blogs?title=${title}`)
}

export const addBlogToReadingList = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await addToReadingList(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/me")
}

export const markBlogAsRead = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await updateReadingList(id)
  revalidatePath("/me")
}