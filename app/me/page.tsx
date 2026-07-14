import Link from "next/link"
import { redirect } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { getUserWithReadingList } from "../services/users"
import { generateToken } from "../actions/users"
import { markBlogAsRead } from "../actions/blogs"

export default async function UserProfile() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const userWithReadingList = await getUserWithReadingList(user.id)
  const readingList = userWithReadingList?.readingList || []

  const unreadBlogs = readingList.filter((item) => !item.read && item.blog)
  const readBlogs = readingList.filter((item) => item.read && item.blog)

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">My profile</h2>
        <p className="mt-2 text-sm text-gray-600">Name: {user.name}</p>
        <p className="mt-2 text-sm text-gray-600">Username: {user.username}</p>

        <div className="h-px w-full bg-neutral-400 my-6" />

        <h2 className="text-2xl font-semibold text-gray-900">Reading list</h2>

        <h3 className="mt-6 text-lg font-medium text-gray-900">Unread blogs ({unreadBlogs.length})</h3>
        {unreadBlogs.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500">No unread blogs in reading list</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {unreadBlogs.map((item) => (
              <li key={item.id} className="rounded-md border border-gray-200 px-4 py-3 flex items-center justify-between">
                <Link className="font-medium text-gray-900 hover:underline pr-2" href={`/blogs/${item.blog.id}`}>
                  {item.blog.title}
                </Link>
                <form action={markBlogAsRead}>
                  <input type="hidden" name="id" value={item.blog.id} />
                  <button type="submit" className="rounded-md bg-gray-900 px-4 py-2 font-medium text-white cursor-pointer">Mark as read</button>
                </form>
              </li>
            ))}
          </ul>
        )}

        <h3 className="mt-6 text-lg font-medium text-gray-900">Read blogs ({readBlogs.length})</h3>
        {readBlogs.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500">No read blogs in reading list</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {readBlogs.map((item) => (
              <li key={item.id} className="rounded-md border border-gray-200 px-4 py-3">
                <Link className="font-medium text-gray-900 hover:underline" href={`/blogs/${item.blog.id}`}>
                  {item.blog.title}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="h-px w-full bg-neutral-400 my-6" />

        <h3 className="mt-6 text-lg font-medium text-gray-900">API Token</h3>
        <p className="mt-2 text-sm text-gray-600 pb-6">Current token: {user.token ? user.token : 'No token has been generated yet'}</p>
        <form action={generateToken}>
          <button type="submit" className="rounded-md bg-gray-900 px-4 py-2 font-medium text-white cursor-pointer">
            Generate new token
          </button>
        </form>
      </div>
    </div>
  )
}