import "./globals.css"
import type { Metadata } from "next"
import Header from "../components/Header"
// import { Inter } from "next/font/google"
// const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lottery simulator",
  description: "Lottery simulator",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='bg-mito-grad text-mito-primary'>
        <Header />
        <div className='py-12 px-20 mt-10 container mx-auto bg-white rounded-3xl shadow-component'>
          {children}
        </div>
      </body>
    </html>
  )
}
