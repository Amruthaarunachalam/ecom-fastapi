'use client'
import Link from "next/link";
import { useEffect ,useState} from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import type { User } from "../lib/api/user";
import { getUser } from "../lib/api/user";

import UserProfile from "../components/userCard";

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
        ? 'bg-mist-400 text-white'
        : 'hover:bg-mist-400 hover:text-white active:bg-stone-500'
    }`;
    return(
        <div>
        {/* Top Header */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-gray-50 text-gray-800 flex items-center justify-between px-6 z-20 shadow-md">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold tracking-wide text-purple-400">StoreAdmin</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Welcome, {user?.name ?? ''}</span>
            <button onClick={()=>setIsOpen(true)}
            className="w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center font-bold text-sm">
              {user?.name?.[0]?.toUpperCase() ?? ''}
            </button>
            <UserProfile
            isOpen={isOpen}
            onClose={()=>setIsOpen(false)}
            user={user}
            />
          </div>
        </header>

        <div className="flex pt-16 min-h-screen">
          {/* Sidebar */}
          <aside className="fixed top-16 bottom-0 left-0 w-64 bg-gray-50 border-r border-gray-200 p-4 z-10">
            <nav className="space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Explore
              </div>
              <Link href="/products" className={linkClass('/products')}>
                 Products 
              </Link>
              <Link href="/categories" className={linkClass('/categories')}>
              Categories
              </Link>
              <Link href="/cart" className={linkClass('/cart')}>
              Cart
              </Link>
              <Link href="/orders" className={linkClass('/orders')}>
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