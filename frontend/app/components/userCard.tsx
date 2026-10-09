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

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />

      <div className="absolute right-0 top-12 z-40 w-64 bg-white text-gray-800 p-4 rounded-xl shadow-lg border border-gray-200">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold uppercase">{user?.name ?? ''}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="space-y-1 text-md text-gray-600">
         <p>My details</p>
        </div>
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 mt-4 w-full text-left text-red-700 hover:opacity-80 transition-opacity active:text-red-900 cursor-pointer"
        >
    <svg
    className='w-5 h-5'
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg">
   <path 
   d="M6 17C6 17.93 6 18.395 6.10222 18.7765C6.37962 19.8117 7.18827 20.6204 8.22354 20.8978C8.60504 21 9.07003 21 10 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H10C9.07003 3 8.60504 3 8.22354 3.10222C7.18827 3.37962 6.37962 4.18827 6.10222 5.22354C6 5.60504 6 6.07003 6 7M12 8L16 12M16 12L12 16M16 12H3" 
   stroke="currentColor" 
   strokeWidth="2" 
   strokeLinecap="round" 
   strokeLinejoin="round"/>
 </svg>
        Logout
        </button>
        </div>
      </div>
    </>
  )
}