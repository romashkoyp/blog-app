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
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3>Blogs</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage
