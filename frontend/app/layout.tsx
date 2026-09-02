import type { Metadata } from 'next';
import './globals.css';
import Categories from './categories/page';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'E-Commerce Dashboard',
  description: 'FastAPI & Next.js Management System',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800 antialiased">
        {/* Top Header */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-slate-900 text-white flex items-center justify-between px-6 z-20 shadow-md">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold tracking-wide text-blue-400">StoreAdmin</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300">Welcome, Admin</span>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm">
              A
            </div>
          </div>
        </header>

        <div className="flex pt-16 min-h-screen">
          {/* Sidebar */}
          <aside className="fixed top-16 bottom-0 left-0 w-64 bg-white border-r border-gray-200 p-4 z-10">
            <nav className="space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Management
              </div>
              <Link href="/" className="flex items-center px-3 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
                 Products 
              </Link>
              <Link href="/categories" className="flex items-center px-3 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
              Categories
              </Link>
            </nav>
          </aside>

          {/* Main Area */}
          <main className="ml-64 flex-1 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}