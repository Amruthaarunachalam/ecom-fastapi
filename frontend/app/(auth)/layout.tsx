export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">E-Commerce App</h1>
      </div>

      {/* Login or Register page */}
      {children}
    </div>
  )
}