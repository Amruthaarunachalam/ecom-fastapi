'use client';

import { FormEvent } from 'react';

interface CategoryFormProps {
  editingId: number | null;
  CategoryName: string;
  setCategoryName: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  onSubmit: (e: FormEvent) => void;
  onReset: () => void;
}

export default function CategoryForm({
  editingId,
  CategoryName,
  setCategoryName,
  description,
  setDescription,
  onSubmit,
  onReset,
}: CategoryFormProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Category Name *"
          value={CategoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          className="h-10 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder:text-gray-400 shadow-sm transition-all duration-150 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        
        <textarea
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="md:col-span-3 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder:text-gray-400 shadow-sm transition-all duration-150 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows={2}
        />
        <div className="md:col-span-3 flex space-x-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-all duration-150 hover:scale-[1.03] hover:shadow-md active:scale-95 cursor-pointer"
          >
            {editingId ? 'Update Category' : 'Create Category'}
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