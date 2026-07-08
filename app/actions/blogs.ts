"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeBlog } from "../services/blogs"
import { auth } from "@/auth"

export const createBlog = async (formData: FormData) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }
  const content = formData.get("content") as string
  const author = formData.get("author") as string
  const title = formData.get("title") as string
  const url = formData.get("url") as string
  await addBlog(content, author, title, url)
  revalidatePath("/blogs")
  redirect("/blogs")
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