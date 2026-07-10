"use client"

import Link from "next/link" // without this register page will not work
import { registerUser } from "../actions/users"
import { useActionState } from "react"

const initialState = {
  errors: {},
  values: {
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
  }
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState)
  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" defaultValue={state?.values?.username} required />
            {/* @ts-ignore */}
            {state.errors.username && <p style={{ color: "red" }}>{state.errors.username}</p>}
          </label>
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" defaultValue={state?.values?.name} required />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" defaultValue={state?.values?.password} required />
            {/* @ts-ignore */}
            {state.errors.password && <p style={{ color: "red" }}>{state.errors.password}</p>}
          </label>
        </div>
        <div>
          <label>
            Confirm password
            <input type="password" name="confirmPassword" defaultValue={state?.values?.confirmPassword} required />
            {/* @ts-ignore */}
            {state.errors.confirmPassword && <p style={{ color: "red" }}>{state.errors.confirmPassword}</p>}
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}