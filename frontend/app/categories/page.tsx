'use client';

import CategoryCard from "../components/CategoryCard";
import CategoryForm from "../components/CategoryForm";
import { useState, useEffect, FormEvent } from "react";


interface Category {
  id: number;
  cat_name: string;
  cat_description?: string;
}

export default function Categories() {
  const [CategoryName, setCategoryName] = useState<string>('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const BASE_URL = 'http://127.0.0.1:8000';

  useEffect(() => {
    fetchCategories();
  }, []);

  
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${BASE_URL}/category/`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error('Failed fetching categories:', err);
    }
  };

 
  const resetForm = () => {
    setEditingId(null);
    setCategoryName('');
    setDescription('');
  };

 
  const handleEdit = (c: Category) => {
    setEditingId(c.id);
    setCategoryName(c.cat_name);
    setDescription(c.cat_description || '');
  };

 
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); 

    const payload = {
      cat_name: CategoryName,
      cat_description: description,
    };

    try {
      if (editingId) {
        await fetch(`${BASE_URL}/category/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${BASE_URL}/category/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      resetForm();
      fetchCategories();
    } catch (err) {
      console.log('Error saving categories:', err);
    }
  };

  // 6. Delete Category Handler
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this Category?')) return;
    try {
      await fetch(`${BASE_URL}/category/${id}`, { method: 'DELETE' });
      fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  return (
    <div className="space-y-8">
      <CategoryForm
        editingId={editingId}
        CategoryName={CategoryName}
        setCategoryName={setCategoryName}
        description={description}
        setDescription={setDescription}
        onSubmit={handleSubmit}
        onReset={resetForm}
      />

     
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Categories Catalog</h2>
        {categories.length === 0 ? ( 
          <div className="p-8 bg-white rounded-xl text-center text-gray-500">
            No categories found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c) => ( 
              <CategoryCard
                key={c.id}
                category={c} 
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}