'use client';

import { FormEvent } from 'react';

interface Category {
  id: number;
  cat_name: string;
}

interface ProductFormProps {
  categories: Category[];
  editingId: number | null;
  prodName: string;
  setProdName: (val: string) => void;
  categoryId: number;
  setCategoryId: (val: number) => void;
  price: string;
  setPrice: (val: string) => void;
  stock: string;
  setStock: (val: string) => void;
  color: string;
  setColor: (val: string) => void;
  imageUrl: string;
  setImageUrl: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  onSubmit: (e: FormEvent) => void;
  onReset: () => void;
}

export default function ProductForm({
  categories,
  editingId,
  prodName,
  setProdName,
  categoryId,
  setCategoryId,
  price,
  setPrice,
  stock,
  setStock,
  color,
  setColor,
  imageUrl,
  setImageUrl,
  description,
  setDescription,
  onSubmit,
  onReset,
}: ProductFormProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-700 dark:bg-gray-800">

      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-3">
        <div>
          <label htmlFor="prod-name" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">Product name</label>
          <input
            id="prod-name"
            type="text"
            placeholder="Product Name *"
            value={prodName}
            onChange={(e) => setProdName(e.target.value)}
            required
            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition hover:border-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-purple-500/30 dark:disabled:bg-gray-700/40"
          />
        </div>
        <div>
          <label htmlFor="prod-category" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">Category</label>
          <select
            id="prod-category"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition hover:border-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-purple-500/30 dark:disabled:bg-gray-700/40"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.cat_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="prod-price" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">Price (₹)</label>
          <input
            id="prod-price"
            type="number"
            placeholder="Price (₹) *"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition hover:border-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-purple-500/30 dark:disabled:bg-gray-700/40"
          />
        </div>
        <div>
          <label htmlFor="prod-stock" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">Available stock</label>
          <input
            id="prod-stock"
            type="number"
            placeholder="Available Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition hover:border-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-purple-500/30 dark:disabled:bg-gray-700/40"
          />
        </div>
        <div>
          <label htmlFor="prod-color" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">Color</label>
          <input
            id="prod-color"
            type="text"
            placeholder="Color (Optional)"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition hover:border-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-purple-500/30 dark:disabled:bg-gray-700/40"
          />
        </div>
        <div>
          <label htmlFor="prod-image" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">Image URL</label>
          <input
            id="prod-image"
            type="text"
            placeholder="Image URL (e.g., https://...)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition hover:border-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-purple-500/30 dark:disabled:bg-gray-700/40"
          />
        </div>
        <div className="md:col-span-3">
          <label htmlFor="prod-desc" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">Description</label>
          <textarea
            id="prod-desc"
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
            {editingId ? 'Update Product' : 'Create Product'}
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