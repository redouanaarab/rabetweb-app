// app/not-found.tsx
import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import { HomeIcon, MailIcon, FileQuestion } from "lucide-react"

export const metadata: Metadata = {
  title: 'Page Not Found | Your Website',
  description: 'Sorry, the page you are looking for does not exist. You can return to the homepage or search for other content.',
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
    },
  }
}

export default function NotFound() {
  return (
    <div className="flex bg-background p-4 md:p-6">
      <div className="w-full max-w-md mx-auto flex flex-col justify-center items-center gap-8 md:gap-10">
        {/* Icon */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-full bg-blue-50">
          <FileQuestion 
            className="w-12 h-12 md:w-16 md:h-16 text-blue-500" 
            strokeWidth={1.5} 
          />
        </div>

        {/* Main content */}
        <div className="space-y-3 text-center">
          <p className="text-5xl md:text-6xl font-bold text-gray-900">404</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Page not found
          </h1>
          <p className="text-muted-foreground">
            Oops! This page seems to be missing
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Button asChild className="w-full" size="lg">
            <Link href="/">
              <HomeIcon className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full" size="lg">
            <Link href="/contact">
              <MailIcon className="mr-2 h-4 w-4" />
              Contact
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}