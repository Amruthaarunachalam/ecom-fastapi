'use client';

import CategoryCard from "../components/CategoryCard";
import CategoryForm from "../components/CategoryForm";
import { useState, useEffect, FormEvent } from "react";
import Modal from "../components/modal";


interface Category {
  id: number;
  cat_name: string;
  cat_description?: string;
}

export default function Categories() {
  const [isOpen,setIsOpen]=useState(false);
  const [deletingId,setDeletingId]=useState<number | null>(null);

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
    setIsOpen(false);
  };

 
  const handleEdit = (c: Category) => {
    setEditingId(c.id);
    setCategoryName(c.cat_name);
    setDescription(c.cat_description || '');
    setIsOpen(true);
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
const handleDeleteClick=(id:number)=>{
    setDeletingId(id);
    setIsOpen(true);
  }

  const handleDelete = async (id: number) => {
    if (!deletingId) return;
    try {
      await fetch(`${BASE_URL}/category/${id}`, { method: 'DELETE' });
      fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  return (
    <div className="space-y-8">
         <button
      onClick={()=>{resetForm();setIsOpen(true);}}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        + Add new Category
      </button>
        <Modal 
        isOpen={isOpen}
        onClose={()=>setIsOpen(false)}
        title={deletingId?"Delete Category":editingId?"Edit Category":"Add Category"}>
      {deletingId?(
             <div>
              <p>Are you sure you want to delete this Category?</p>
             <div className="flex justify-end space-x-3 pt-2">
              <button 
              onClick={()=>handleDelete(deletingId)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Confirm
              </button><span>
              <button 
              onClick={()=>{setIsOpen(false);resetForm()}}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                  Cancel
                  </button></span>
                  </div>
             </div>):
      
      (<CategoryForm
        editingId={editingId}
        CategoryName={CategoryName}
        setCategoryName={setCategoryName}
        description={description}
        setDescription={setDescription}
        onSubmit={handleSubmit}
        onReset={resetForm}
      />)}
      </Modal>

     
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
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}