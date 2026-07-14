import { NextRequest, NextResponse } from "next/server"
import { registerUser } from "@/app/actions/users"

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  const body = await req.json()
  const { username, name, password } = body
  const confirmPassword = password

  const formData = new FormData()
  formData.append("username", username || "")
  formData.append("name", name || "")
  formData.append("password", password || "")
  formData.append("confirmPassword", confirmPassword || "")

  const result = await registerUser(
    {
      errors: {},
      success: false,
      values: {
        username: username || "",
        name: name || "",
        password: password || "",
        confirmPassword: confirmPassword || ""
      }
    },
    formData
  )

  if (!result.success) {
    return NextResponse.json({ errors: result.errors }, { status: 400 })
  }

  return NextResponse.json({ message: "User created" }, { status: 201 })
}