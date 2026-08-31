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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        {editingId ? 'Edit Product' : 'Add New Product'}
      </h2>
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Product Name *"
          value={prodName}
          onChange={(e) => setProdName(e.target.value)}
          required
          className="p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="p-2.5 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.cat_name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Price ($) *"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="number"
          placeholder="Available Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="text"
          placeholder="Color (Optional)"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="text"
          placeholder="Image URL (e.g., https://...)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
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
            {editingId ? 'Update Product' : 'Create Product'}
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