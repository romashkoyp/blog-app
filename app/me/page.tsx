"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { useSession } from "next-auth/react"
import { generateToken } from "../actions/users"

export default function UserProfile() {
  const { data: session, status } = useSession()
  
  const generateNewToken = async () => {
    const token = await generateToken()
    console.log("Generated token from use client component:", token)
  }

  if (status === "loading") {
    return <div className="mx-auto max-w-2xl px-4 py-8">Loading...</div>
  }

  if (!session) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">My profile</h2>
        <p className="mt-2 text-sm text-gray-600">Name: {session.user?.name}</p>
        <p className="mt-2 text-sm text-gray-600">Username: {session.user?.email}</p>
        <h3 className="mt-6 text-lg font-medium text-gray-900">API Token</h3>
        <p className="mt-2 text-sm text-gray-600 pb-6">Current token: {session.user?.token ? session.user.token : 'No token has been generated yet'}</p>
        <form action={generateNewToken}>
          <button type="submit" className="rounded-md bg-gray-900 px-4 py-2 font-medium text-white cursor-pointer">
            Generate new token
          </button>
        </form>
      </div>
    </div>
  )
}