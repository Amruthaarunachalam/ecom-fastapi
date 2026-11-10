'use client';

import { FormEvent } from 'react';

interface LoginRequestProps {
  email:string;
  setEmail:(val:string)=>void;
  password:string;
  setPassword:(val:string)=>void;
  onSubmit: (e: FormEvent) => void;
  onReset: () => void;
}

export default function LoginForm({
  email,setEmail,password,setPassword,onSubmit,onReset
}: LoginRequestProps) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-700 dark:bg-gray-800">

      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5">
        <div>
          <label htmlFor="login-email" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">
            Email
          </label>
          <input
            id="login-email"
            type="text"
            placeholder="Email Id *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition hover:border-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-purple-500/30"
          />
        </div>

        <div>
          <label htmlFor="login-password" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            placeholder="Password *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition hover:border-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-purple-500/30"
          />
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-purple-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-purple-600 hover:shadow-md active:scale-95 cursor-pointer"
          >
            Login
          </button>
          {/*editingId && ()*/}
          <button
            type="button"
            onClick={onReset}
            className="rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-all duration-150 hover:bg-gray-50 active:scale-95 cursor-pointer dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}