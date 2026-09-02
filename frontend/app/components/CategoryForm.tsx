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
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        {editingId ? 'Edit Category' : 'Add New Category'}
      </h2>
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Category Name *"
          value={CategoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          className="p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        
        <textarea
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="md:col-span-3 p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          rows={2}
        />
        <div className="md:col-span-3 flex space-x-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
          >
            {editingId ? 'Update Category' : 'Create Category'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={onReset}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg text-sm transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}