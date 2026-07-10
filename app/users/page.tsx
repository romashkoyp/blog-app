import Link from "next/link"
import { getUsers } from "../services/users"

const Users = async () => {
  const users = await getUsers()

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h2 className="mb-4 text-2xl font-semibold text-gray-900">Users</h2>
      <ul className="space-y-3">
        {users.map((user) => (
          <li key={user.username} className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <Link className="font-medium text-gray-900 hover:underline" href={`/users/${user.username}`}>
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users