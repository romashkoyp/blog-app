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
      <div data-testid="user-profile" className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">My profile</h2>
        <p data-testid="user-name" className="mt-2 text-sm text-gray-600">Name: {user.name}</p>
        <p data-testid="user-username" className="mt-2 text-sm text-gray-600">Username: {user.username}</p>

        <div className="h-px w-full bg-neutral-400 my-6" />

        <div data-testid="reading-list-section">
          <h2 className="text-2xl font-semibold text-gray-900">Reading list</h2>
          {readingList.length === 0 && (
            <p data-testid="empty-reading-list" className="mt-2 text-sm text-gray-500">Your reading list is empty</p>
          )}

          <div data-testid="unread-section" className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Unread blogs ({unreadBlogs.length})</h3>
            {unreadBlogs.length === 0 ? (
              <p data-testid="no-unread-blogs" className="mt-2 text-sm text-gray-500">No unread blogs in reading list</p>
            ) : (
              <ul className="mt-3 space-y-3">
                {unreadBlogs.map((item) => (
                  <li key={item.id} className="rounded-md border border-gray-200 px-4 py-3 flex items-center justify-between">
                    <Link className="font-medium text-gray-900 hover:underline pr-2" href={`/blogs/${item.blog.id}`}>
                      {item.blog.title}
                    </Link>
                    <form action={markBlogAsRead}>
                      <input type="hidden" name="id" value={item.blog.id} />
                      <button type="submit" data-testid={`mark-read-${item.blog.id}`} className="rounded-md bg-gray-900 px-4 py-2 font-medium text-white cursor-pointer">Mark as read</button>
                    </form>
                  </li>
                ))}
              </ul>
            )}
          </div>

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
        </div>

        <div className="h-px w-full bg-neutral-400 my-6" />

        <div data-testid="api-token-section">
          <h3 className="text-lg font-medium text-gray-900">API Token</h3>
          {user.token ? (
            <div data-testid="token-display">
              <p className="mt-2 text-sm text-gray-600 pb-6">
                Current token: <code data-testid="api-token">{user.token}</code>
              </p>
            </div>
          ) : (
            <p data-testid="no-token-message" className="mt-2 text-sm text-gray-600 pb-6">No token has been generated yet</p>
          )}
          <form action={generateToken}>
            <button type="submit" data-testid="generate-token-button" className="rounded-md bg-gray-900 px-4 py-2 font-medium text-white cursor-pointer">
              Generate new token
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}