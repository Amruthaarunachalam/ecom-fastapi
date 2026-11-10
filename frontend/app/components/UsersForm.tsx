'use client';

import { FormEvent ,useState} from 'react';

interface UserFormProps {
  editingId: number | null;
  Name: string;
  setName: (val: string) => void;
  Phone_no: string;
  setPhone_no: (val: string) => void;
  Email:string;
  setEmail:(val:string)=>void;
  password:string;
  setPassword:(val:string)=>void;
  onSubmit: (e: FormEvent) => void;
  onReset: () => void;
}

export default function UserForm({
  editingId,
  Name,
  setName,
  Phone_no,
  setPhone_no,
  Email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  onReset,
}: UserFormProps) {
  const [confirmPassword,setConfirmPassword]=useState('')
  const mismatch = confirmPassword !== '' && password !== confirmPassword
  const tooShort = password !== '' && password.length < 8
  const emailInvalid = Email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)
  const phoneInvalid = Phone_no !== '' && !/^[6-9]\d{9}$/.test(Phone_no)


  return (
    <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-700 dark:bg-gray-800">

      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="reg-name" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">Name</label>
          <input
            id="reg-name"
            type="text"
            placeholder=" Name *"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition hover:border-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-purple-500/30"
          />
        </div>

        <div>
          <label htmlFor="reg-phone" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">Phone number</label>
          <input
            id="reg-phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder=" Phone No *"
            value={Phone_no}
            onChange={(e) => setPhone_no(e.target.value.replace(/\D/g, ''))}
            required
            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition hover:border-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-purple-500/30"
          />
          {phoneInvalid && (
            <p className="mt-1.5 text-xs text-red-600">
              Enter a valid 10-digit mobile number (starts with 6 to 9)
            </p>
          )}
        </div>

        <div>
          <label htmlFor="reg-email" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">Email</label>
          <input
            id="reg-email"
            type="email"
            placeholder=" Email ID *"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition hover:border-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-purple-500/30"
          />
          {emailInvalid && (
            <p className="mt-1.5 text-xs text-red-600">Enter a valid email address</p>
          )}
        </div>

        <div>
          <label htmlFor="reg-password" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">Password</label>
          <input
            id="reg-password"
            type="password"
            placeholder=" password *"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition hover:border-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-purple-500/30"
          />
          <p className={`mt-1.5 text-xs ${tooShort ? 'text-red-600' : 'text-gray-500 dark:text-gray-400'}`}>
            Password must be at least 8 characters
          </p>
        </div>

        <div>
          <label htmlFor="reg-confirm" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">Confirm password</label>
          <input
            id="reg-confirm"
            type="password"
            placeholder=" Confirm password *"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition hover:border-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-purple-500/30"
          />
          {mismatch && (
            <p className="mt-1.5 text-xs text-red-600">Passwords do not match</p>
          )}
        </div>

        <div className="flex gap-3 pt-2 sm:col-span-2">
          <button
            type="submit"
            disabled={mismatch || tooShort || emailInvalid || phoneInvalid}
            className="rounded-lg bg-purple-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-purple-600 hover:shadow-md active:scale-95 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            Register
          </button>
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