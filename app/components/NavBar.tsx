"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { usePathname } from "next/navigation"

export default function NavBar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const getLinkClass = (href: string) => {
    const isActive = pathname === href
    return `inline-block p-3 hover:bg-gray-600 rounded-md ${isActive ? "underline decoration-2 underline-offset-4 font-semibold" : ""}`
  }

  return (
    <nav className="sticky top-0 z-50 bg-gray-800 text-white justify-between flex items-center">
      {session ? (
        <>
          <div>
            <Link className={getLinkClass("/")} href="/">home</Link>
            <Link className={getLinkClass("/blogs")} href="/blogs">blogs</Link>
            <Link className={getLinkClass("/users")} href="/users">users</Link>
            <Link className={getLinkClass("/blogs/new")} href="/blogs/new">create new</Link>
          </div>
          <div>
            <Link className={getLinkClass("/me")} href="/me">{session.user?.name}</Link>
            <button className="p-3 hover:bg-gray-600 rounded-md cursor-pointer" onClick={() => signOut()}>
              logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link className={getLinkClass("/")} href="/">home</Link>
            <Link className={getLinkClass("/blogs")} href="/blogs">blogs</Link>
            <Link className={getLinkClass("/users")} href="/users">users</Link>
          </div>
          <div>
            <Link className={getLinkClass("/login")} href="/login">login</Link>
            <Link className={getLinkClass("/register")} href="/register">register</Link>
          </div>
        </>
      )}
    </nav>
  )
}