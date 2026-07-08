import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogsByUserId, getUserById } from "../../services/users"

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const user = await getUserById(Number(id))
  const blogs = await getBlogsByUserId(Number(id))

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
