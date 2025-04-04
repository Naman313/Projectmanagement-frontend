'use client';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>

        {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  )
}