'use client'

import { useRouter } from 'next/navigation'
import type { User } from '../lib/api/user'

interface ProfileProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
}

export default function UserProfile({ isOpen, onClose, user }: ProfileProps) {
  const router = useRouter()

  if (!isOpen) return null

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    router.replace('/login')
  }

  const mydetails = () => {
    router.push('/me')
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-30" onClick={onClose} />

      {/* Card Popup */}
      <div className="absolute right-0 top-12 z-40 w-64 rounded-xl border border-gray-200 bg-white p-4 text-gray-800 shadow-lg">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold uppercase">{user?.name ?? ''}</h2>
          <button
            onClick={onClose}
            className="cursor-pointer font-bold text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {/* My Details Button */}
          <button
            onClick={mydetails}
            className="flex w-full cursor-pointer items-center gap-2 text-left text-md text-gray-600 transition-colors hover:text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>My details</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center gap-2 pt-2 text-left text-red-700 transition-opacity hover:opacity-80 active:text-red-900"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 17C6 17.93 6 18.395 6.10222 18.7765C6.37962 19.8117 7.18827 20.6204 8.22354 20.8978C8.60504 21 9.07003 21 10 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H10C9.07003 3 8.60504 3 8.22354 3.10222C7.18827 3.37962 6.37962 4.18827 6.10222 5.22354C6 5.60504 6 6.07003 6 7M12 8L16 12M16 12L12 16M16 12H3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}