import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithBlogs, getUserByUsername } from "../../services/users"

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params
  const user = await getUserByUsername(String(username))
  const id = user?.id
  const userBlogs = await getUserWithBlogs(Number(id))
  const blogs = userBlogs?.blogs || []

  if (!user) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
        <p className="mt-2 text-sm text-gray-600">Username: {user.username}</p>
        <h3 className="mt-6 text-lg font-medium text-gray-900">Blogs</h3>
        <ul className="mt-3 space-y-3">
        {blogs.map((blog) => (
          <li key={blog.id} className="rounded-md border border-gray-200 px-4 py-3">
            <Link className="font-medium text-gray-900 hover:underline" href={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        ))}
        </ul>
      </div>
    </div>
  )
}

export default UserPage
