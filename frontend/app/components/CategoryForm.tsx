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
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-700 dark:bg-gray-800">

      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-3">
        <div>
          <label htmlFor="cat-name" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">Category name</label>
          <input
            id="cat-name"
            type="text"
            placeholder="Category Name *"
            value={CategoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition hover:border-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-purple-500/30 dark:disabled:bg-gray-700/40"
          />
        </div>

        <div className="md:col-span-3">
          <label htmlFor="cat-desc" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">Description</label>
          <textarea
            id="cat-desc"
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition hover:border-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-purple-500/30"
            rows={3}
          />
        </div>
        <div className="flex gap-3 pt-1 md:col-span-3">
          <button
            type="submit"
            className="rounded-lg bg-purple-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-purple-600 hover:shadow-md active:scale-95 cursor-pointer"
          >
            {editingId ? 'Update Category' : 'Create Category'}
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