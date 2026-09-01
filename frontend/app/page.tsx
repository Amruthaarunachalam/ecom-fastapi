'use client';

import { useState, useEffect, FormEvent } from 'react';
import CategoryFilter from './components/CategoryFilter';
import ProductForm from './components/ProductForm';
import ProductCard from './components/ProductCard';

interface Category {
  id: number;
  cat_name: string;
  cat_description?: string;
}

interface Product {
  id: number;
  prod_name: string;
  category_id: number;
  prod_description?: string;
  prod_color?: string;
  prod_price: number;
  available_stock?: number;
  image_url?: string;
}

export default function Dashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | 'ALL'>('ALL');

  // Form states
  const [editingId, setEditingId] = useState<number | null>(null);
  const [prodName, setProdName] = useState('');
  const [categoryId, setCategoryId] = useState<number>(0);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [color, setColor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const BASE_URL = 'http://127.0.0.1:8000';

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${BASE_URL}/category/`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
        if (data.length > 0 && categoryId === 0) setCategoryId(data[0].id);
      }
    } catch (err) {
      console.error('Failed fetching categories:', err);
    }
  };

  const fetchProducts = async (catId?: number | 'ALL') => {
    try {
      const targetCat = catId !== undefined ? catId : selectedCategory;
      let url = `${BASE_URL}/products/`;
      if (targetCat !== 'ALL') url += `?category_id=${targetCat}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed fetching products:', err);
    }
  };

  const handleCategoryFilter = (catId: number | 'ALL') => {
    setSelectedCategory(catId);
    fetchProducts(catId);
  };

  const resetForm = () => {
    setEditingId(null);
    setProdName('');
    setPrice('');
    setStock('');
    setColor('');
    setImageUrl('');
    setDescription('');
  };

  const handleEdit = (p: Product) => {
    setEditingId(p.id);
    setProdName(p.prod_name);
    setCategoryId(p.category_id);
    setPrice(p.prod_price.toString());
    setStock(p.available_stock?.toString() || '');
    setColor(p.prod_color || '');
    setImageUrl(p.image_url || '');
    setDescription(p.prod_description || '');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      prod_name: prodName,
      category_id: Number(categoryId),
      prod_price: parseFloat(price),
      available_stock: stock ? parseInt(stock) : 0,
      prod_color: color,
      image_url: imageUrl,
      prod_description: description,
    };

    try {
      if (editingId) {
        await fetch(`${BASE_URL}/products/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`${BASE_URL}/products/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Category Filter Component */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryFilter}
      />

      {/* 2. Product Form Component */}
      <ProductForm
        categories={categories}
        editingId={editingId}
        prodName={prodName}
        setProdName={setProdName}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        price={price}
        setPrice={setPrice}
        stock={stock}
        setStock={setStock}
        color={color}
        setColor={setColor}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        description={description}
        setDescription={setDescription}
        onSubmit={handleSubmit}
        onReset={resetForm}
      />

      {/* 3. Product Grid displaying Product Cards */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Products Catalog</h2>
        {products.length === 0 ? (
          <div className="p-8 bg-white rounded-xl text-center text-gray-500">
            No products found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
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