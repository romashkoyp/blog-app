import "./globals.css"
import Link from "next/link"
import AuthSessionProvider from "./components/SessionProvider"
import { NotificationProvider } from "./components/NotificationContext"
import Notification from "./components/Notification"
import NavBar from "./components/NavBar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            {children}
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}