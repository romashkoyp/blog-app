"use client"

import { useActionState, useEffect } from "react"
import { createBlog } from "../../actions/blogs"
import { useRouter } from "next/navigation"
import { useNotification } from "../../components/NotificationContext"

const initialState = {
  errors: {},
  success: false,
  values: {
    title: "",
    author: "",
    content: "",
    url: ""
  }
}

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("blog created")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">Create a new blog post</h2>
        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
              <input type="text" name="title" defaultValue={state?.values?.title} required className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-gray-400 focus:outline-none" />
            </label>
            {/* @ts-ignore */}
            {state.errors.title && <p className="mt-1 text-sm text-red-600">{state.errors.title}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Author
              <input type="text" name="author" defaultValue={state?.values?.author} required className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-gray-400 focus:outline-none" />
            </label>
            {/* @ts-ignore */}
            {state.errors.author && <p className="mt-1 text-sm text-red-600">{state.errors.author}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
              <input type="text" name="content" defaultValue={state?.values?.content} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-gray-400 focus:outline-none" />
            </label>
            {/* @ts-ignore */}
            {state.errors.content && <p className="mt-1 text-sm text-red-600">{state.errors.content}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              URL
              <input type="text" name="url" defaultValue={state?.values?.url} required className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-gray-400 focus:outline-none" />
            </label>
            {/* @ts-ignore */}
            {state.errors.url && <p className="mt-1 text-sm text-red-600">{state.errors.url}</p>}
          </div>
          <button type="submit" className="rounded-md bg-gray-900 px-4 py-2 font-medium text-white cursor-pointer">
            Create
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewBlog