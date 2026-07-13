"use client"

import Link from "next/link" // without this register page will not work
import { useRouter } from "next/navigation"
import { registerUser } from "../actions/users"
import { useActionState, useEffect } from "react"
import { useNotification } from "../components/NotificationContext"

const initialState = {
  errors: {},
  success: false,
  values: {
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
  }
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("User registered")
      router.push("/")
    }
  }, [state, showNotification, router])

  return (
    <div className="flex flex-col items-center my-30">
      <div className="flex flex-col items-center justify-center bg-gray-100 pt-10 pb-10 rounded-md w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-black">Register</h2>
        <form action={formAction} className="flex flex-col gap-6 p-4 rounded-md">
          <div className="flex flex-col gap-5">
            <label className="text-black min-w-50">
              Username
              <input 
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" 
                type="text" 
                name="username" 
                defaultValue={state?.values?.username} 
                required 
              />
              {/* @ts-ignore */}
              {state.errors.username && <p className="text-red-500 mt-1">{state.errors.username}</p>}
            </label>
          </div>
          <div className="flex flex-col gap-5">
            <label className="text-black min-w-50">
              Name
              <input 
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" 
                type="text" 
                name="name" 
                defaultValue={state?.values?.name} 
                required 
              />
            </label>
          </div>
          <div className="flex flex-col gap-5">
            <label className="text-black min-w-50">
              Password
              <input 
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" 
                type="password" 
                name="password" 
                defaultValue={state?.values?.password} 
                required 
              />
              {/* @ts-ignore */}
              {state.errors.password && <p className="text-red-500 mt-1">{state.errors.password}</p>}
            </label>
          </div>
          <div className="flex flex-col gap-5">
            <label className="text-black min-w-50">
              Confirm password
              <input 
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" 
                type="password" 
                name="confirmPassword" 
                defaultValue={state?.values?.confirmPassword} 
                required 
              />
              {/* @ts-ignore */}
              {state.errors.confirmPassword && <p className="text-red-500 mt-1">{state.errors.confirmPassword}</p>}
            </label>
          </div>
          <button 
            type="submit" 
            className="bg-amber-800 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-md hover:shadow-lg transition duration-300 cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}