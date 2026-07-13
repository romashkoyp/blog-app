import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { likeOneBlog, addBlogToReadingList } from "../../actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">{blog.title}</h2>
        <p className="mt-3 text-sm text-gray-700">{blog.content}</p>
        <p className="mt-4 text-sm text-gray-600">Author: {blog.author}</p>
        <p className="mt-2 text-sm text-gray-600">
          <a className="hover:text-gray-800 hover:underline" href={blog.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </p>
        <div className="mt-6 flex items-center justify-evenly text-sm text-gray-500">
          <p>Likes: {blog.likes}</p>
          <form action={likeOneBlog}>
            <input type="hidden" name="id" value={blog.id} />
            <button type="submit" className="rounded-md bg-gray-900 px-4 py-2 font-medium text-white cursor-pointer">
              Like
            </button>
          </form>
          <form action={addBlogToReadingList}>
            <input type="hidden" name="id" value={blog.id} />
            <button type="submit" className="rounded-md bg-gray-900 px-4 py-2 font-medium text-white cursor-pointer">
              Add to reading list
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BlogPage