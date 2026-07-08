"use client"

import { useActionState } from "react"
import { createBlog } from "../../actions/blogs"

const initialState = {
  errors: {},
  values: {
    title: "",
    author: "",
    content: "",
    url: ""
  }
}

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState)

  return (
    <div>
      <h2>Create a new blog post</h2>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input type="text" name="title" defaultValue={state?.values?.title} required />
            {/* @ts-ignore */}
            {state.errors.title && <p style={{ color: "red" }}>{state.errors.title}</p>}
          </label>
        </div>
        <div>
          <label>
            Author
            <input type="text" name="author" defaultValue={state?.values?.author} required />
            {/* @ts-ignore */}
            {state.errors.author && <p style={{ color: "red" }}>{state.errors.author}</p>}
          </label>
        </div>
        <div>
          <label>
            Content
            <input type="text" name="content" defaultValue={state?.values?.content} />
            {/* @ts-ignore */}
            {state.errors.content && <p style={{ color: "red" }}>{state.errors.content}</p>}
          </label>
        </div>
        <div>
          <label>
            URL
            <input type="text" name="url" defaultValue={state?.values?.url} required />
            {/* @ts-ignore */}
            {state.errors.url && <p style={{ color: "red" }}>{state.errors.url}</p>}
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog