'use client';

import { FormEvent } from 'react';

interface UserFormProps {
  editingId: number | null;
  Name: string;
  setName: (val: string) => void;
  Phone_no: string;
  setPhone_no: (val: string) => void;
  Email:string;
  setEmail:(val:string)=>void;
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
  onSubmit,
  onReset,
}: UserFormProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder=" Name *"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          required
          className="h-10 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder:text-gray-400 shadow-sm transition-all duration-150 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
         <input
          type="text"
          placeholder=" Phone No *"
          value={Phone_no}
          onChange={(e) => setPhone_no(e.target.value)}
          required
          className="h-10 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder:text-gray-400 shadow-sm transition-all duration-150 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
         <input
          type="text"
          placeholder=" Email ID *"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-10 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder:text-gray-400 shadow-sm transition-all duration-150 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        
        <div className="md:col-span-3 flex space-x-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-all duration-150 hover:scale-[1.03] hover:shadow-md active:scale-95 cursor-pointer"
          >
            {editingId ? 'Update User' : 'Create User'}
          </button>
          {/*editingId && ()*/}
            <button
              type="button"
              onClick={onReset}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg text-sm transition-all duration-150 hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              Cancel
            </button>
          
        </div>
      </form>
    </div>
  );
}