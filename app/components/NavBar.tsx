"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-50 bg-gray-800 text-white p-4 justify-between flex items-center">
      {session ? (
        <>
          <div>
            <Link className="p-4 hover:bg-gray-600 rounded-md" href="/">home</Link>
            <Link className="p-4 hover:bg-gray-600 rounded-md" href="/blogs">blogs</Link>
            <Link className="p-4 hover:bg-gray-600 rounded-md" href="/users">users</Link>
            <Link className="p-4 hover:bg-gray-600 rounded-md" href="/blogs/new">create new</Link>
          </div>
          <div>
            <Link className="p-4 hover:bg-gray-600 rounded-md" href="/me">{session.user?.name}</Link>
            <button className="p-4 hover:bg-gray-600 rounded-md cursor-pointer" onClick={() => signOut()}>
              logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link className="p-4 hover:bg-gray-600 rounded-md" href="/">home</Link>
            <Link className="p-4 hover:bg-gray-600 rounded-md" href="/blogs">blogs</Link>
            <Link className="p-4 hover:bg-gray-600 rounded-md" href="/users">users</Link>
          </div>
          <div>
            <Link className="p-4 hover:bg-gray-600 rounded-md" href="/login">login</Link>
            <Link className="p-4 hover:bg-gray-600 rounded-md" href="/register">register</Link>
          </div>
        </>
      )}
    </nav>
  )
}