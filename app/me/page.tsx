"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { useSession } from "next-auth/react"

export default function UserProfile() {
  const { data: session } = useSession()
 
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
      </div>
    </div>
  )
}