'use client'
import Link from "next/link";
import { useEffect ,useState} from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import type { User } from "../lib/api/user";
import { getUser } from "../lib/api/user";

import UserProfile from "../components/userCard";
import ThemeToggle from "../components/themeToggle";

export default function MainLayout({
    children,
}:{children:React.ReactNode}){

  const [user,setUser]=useState<User | null >(null)
  const [isOpen,setIsOpen]=useState(false)

  const pathname=usePathname()
  const router=useRouter()

  useEffect(()=>{
    const token=localStorage.getItem('access_token')
    if(!token){
      router.replace('/login')
    }
    const loadUser=async()=>{{
      try{
    const data= await getUser()
    setUser(data)}
    catch(err){
      console.error('unable to fetch user',(err))
    }
  }}
   loadUser()
  },[router])

  const linkClass = (href: string) =>
    `flex items-center space-x-2 px-3 py-2.5 text-sm rounded transition-all ${
      pathname === href
        ? 'bg-purple-400 text-white'
        : 'hover:bg-mist-400 hover:text-white active:bg-stone-500'
    }`;
    return(
        <div>
        {/* Top Header */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-gray-50 text-gray-800  dark:bg-gray-800/50 flex items-center justify-between px-6 z-20 shadow-md">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold tracking-wide text-purple-400">StoreAdmin</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700 dark:text-white">Welcome, {user?.name ?? ''}</span>
            <button onClick={()=>setIsOpen(true)}
            className="w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center font-bold text-sm">
              {user?.name?.[0]?.toUpperCase() ?? ''}
            </button>
            <ThemeToggle></ThemeToggle>
            <UserProfile
            isOpen={isOpen}
            onClose={()=>setIsOpen(false)}
            user={user}
            />
          </div>
        </header>

        <div className="flex pt-16 min-h-screen">
          {/* Sidebar */}
          <aside className="fixed top-16 bottom-0 left-0 w-64 bg-gray-50 border-r dark:bg-gray-800/50 dark:border-gray-800/50 border-gray-200 p-4 z-10">
            <nav className="space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Explore
              </div>
              
                <Link href="/products" className={linkClass('/products')}>
  {/* NEW: Uniform, clean products catalog grid icon */}
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
  Products
</Link>

  <Link href="/categories" className={linkClass('/categories')}>
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 6C4 4.89543 4.89543 4 6 4H10.5858C11.1162 4 11.6249 4.21071 12 4.58579L20 12.5858C20.781 13.3668 20.781 14.6332 20 15.4142L15.4142 20C14.6332 20.781 13.3668 20.781 12.5858 20L4.58579 12C4.21071 11.6249 4 11.1162 4 10.5858V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M8.5 8.5H8.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  Categories
  </Link>

  <Link href="/cart" className={linkClass('/cart')}>
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 2H3.30616C3.77418 2 3.98715 2.14922 4.09812 2.68686L4.57143 6M4.57143 6L5.62332 13.7314C5.82355 15.2031 7.30886 16.5 8.79411 16.5H17.352C18.7658 16.5 20.2309 15.2876 20.4955 13.8988L21.8191 6.94969C21.8812 6.62381 21.7499 6.06802 21.6475 6.06802H4.57143ZM10 21C10 21.5523 9.55228 22 9 22C8.44772 22 8 21.5523 8 21C8 20.4477 8.44772 20 9 20C9.55228 20 10 20.4477 10 21ZM18 21C18 21.5523 17.5523 22 17 22C16.4477 22 16 21.5523 16 21C16 20.4477 16.4477 20 17 20C17.5523 20 18 20.4477 18 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  Cart
 </Link>

  <Link href="/orders" className={linkClass('/orders')}>
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
   Orders
 </Link>

            </nav>
          </aside>

          {/* Main Area */}
          <main className="ml-64 flex-1 p-8">
            {children}
          </main>
        </div>
      
   </div>
    )
}