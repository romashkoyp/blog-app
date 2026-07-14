"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useNotification } from "../components/NotificationContext"

export default function LoginPage() {
  const router = useRouter()
  const { showNotification } = useNotification()
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      showNotification("Logged in successfully")
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="flex flex-col items-center my-30">
      <div className="flex flex-col items-center justify-center bg-gray-100 pt-10 pb-10 rounded-md w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-black">Login</h2>
        {error && <p data-testid="error-message" style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4 rounded-md">
          <div className="flex flex-row">
            <label className="text-black min-w-50">
              Username
              <input className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="username" required />
            </label>
          </div>
          <div className="flex flex-col gap-5">
            <label className="text-black min-w-50">
              Password
              <input className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" name="password" required />
            </label>
          </div>
          <button type="submit" data-testid="login-button" className="bg-amber-800 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-md hover:shadow-lg transition duration-300 cursor-pointer">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}