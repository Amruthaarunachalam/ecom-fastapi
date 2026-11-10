'use client';

import CategoryCard from "../../components/CategoryCard";
import CategoryForm from "../../components/CategoryForm";
import { useState, useEffect, FormEvent } from "react";
import Modal from "../../components/modal";

import { getCategories, createCategory, updateCategory, deleteCategory } from '../../lib/api/categories';
import type { Category } from '../../lib/api/categories';
import { WS_URL } from "@/app/lib/config";

import { getUser } from '@/app/lib/api/user';

export default function Categories() {
  const [isOpen,setIsOpen]=useState(false);
  const [deletingId,setDeletingId]=useState<number | null>(null);

  const [CategoryName, setCategoryName] = useState<string>('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const [isAdmin,setIsAdmin]=useState(false)


  useEffect(() => {
    getCurrentUser();
    fetchCategories();
    
  }, []);

  const getCurrentUser = async () => {
  try {
    const data = await getUser();
    setIsAdmin(data.role === "admin");   
  } catch (err) {
    console.error("failed getting the user:", err)
  }
}
  
 const fetchCategories = async () => {
  try {
    setCategories(await getCategories());
  } catch (err:unknown) {
    console.error('Failed fetching categories:', err);
    setError(err instanceof Error ? err.message : 'Could not load categories');
  }
};

 
  const resetForm = () => {
    setEditingId(null);
    setDeletingId(null);
    setCategoryName('');
    setDescription('');
    setFormError('');
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
  setFormError('');

  const payload = {
    cat_name: CategoryName,
    cat_description: description,
  };

  try {
    if (editingId) {
      await updateCategory(editingId, payload);
    } else {
      await createCategory(payload);
    }
    resetForm();
    fetchCategories();
  } catch (err:unknown) {
    setFormError(err instanceof Error ? err.message : 'Could not save the category');
  }
}

const handleDeleteClick=(id:number)=>{
    setDeletingId(id);
    setIsOpen(true);
  }

 const handleDelete = async (id: number) => {
  if (!deletingId) return;
  try {
    await deleteCategory(id);
    fetchCategories();
  } catch (err:unknown) {
    setError(err instanceof Error ? err.message : 'Could not delete the category');
  }
};

  return (
    <div className="space-y-8">
      {isAdmin&&(
      <div className="flex justify-end">
         <button
      onClick={()=>{resetForm();setIsOpen(true);}}
      className="px-4 py-2 bg-purple-400 text-white rounded-md overflow-hidden shadow-lg hover:bg-blue-700 cursor-pointer hover:scale-105">
        + Add new Category
      </button>
      </div>
      )}
        <Modal 
        isOpen={isOpen}
        onClose={()=>setIsOpen(false)}
        title={deletingId?"Delete Category":editingId?"Edit Category":"Add Category"}>
      {deletingId?(
             <div>
              <p>Are you sure you want to delete this Category?</p>
              <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                  <p className="font-bold">Note:</p>
                    <p>Products associated with this category will also be deleted.</p>
                </div>
             <div className="flex justify-end space-x-3 pt-2">
              <button 
              onClick={()=>{handleDelete(deletingId);setIsOpen(false);resetForm()}}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer hover:scale-105">
              Confirm
              </button><span>
              <button 
              onClick={()=>{setIsOpen(false);resetForm()}}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer hover:scale-105">
                  Cancel
                  </button></span>
                  </div>
             </div>):
      
      ( <>
        {formError && <p className="mb-2 text-sm text-red-600">{formError}</p>}
      <CategoryForm
        editingId={editingId}
        CategoryName={CategoryName}
        setCategoryName={setCategoryName}
        description={description}
        setDescription={setDescription}
        onSubmit={handleSubmit}
        onReset={resetForm}
      />
      </>)}
      </Modal>

     
      <div>
        <h2 className="text-2xl font-bold mb-4 uppercase text-gray-800">Categories Catalog</h2>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
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
                isAdmin={isAdmin}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}