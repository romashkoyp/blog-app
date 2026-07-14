import Link from "next/link"
import { sortBlogsByLikes, filterBlogsByTitle } from "../services/blogs"
import { filterByTitle } from "../actions/blogs"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>
}) => {
  const blogs = await sortBlogsByLikes()
  const title = (await searchParams)?.title?.trim().toLowerCase()

  const filteredBlogs = title
    ? await filterBlogsByTitle(title)
    : blogs

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-gray-900">Blogs</h2>
        <form action={filterByTitle} className="flex gap-2">
          <input
            type="text"
            name="title"
            data-testid="filter-input"
            placeholder="Filter by title"
            className="w-48 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            data-testid="search-button"
            className="cursor-pointer rounded-md bg-gray-900 px-8 py-2 text-sm font-medium text-white"
          >
            Filter
          </button>
        </form>
      </div>
      <div data-testid="blogs-list" className="space-y-4">
        {filteredBlogs.map(blog => (
          <div key={blog.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="mb-2 text-lg font-semibold text-gray-900">
              <Link className="hover:underline" href={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </p>
            <p className="text-sm text-gray-600">By {blog.author}</p>
            <p className="mt-3 text-sm text-gray-700">{blog.content}</p>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <a className="hover:text-gray-700 hover:underline" href={blog.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
              <p>{blog.likes} likes</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blogs