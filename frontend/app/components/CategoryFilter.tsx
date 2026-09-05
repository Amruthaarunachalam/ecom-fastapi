'use client';

interface Category {
  id: number;
  cat_name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: number | 'ALL';
  onSelectCategory: (catId: number | 'ALL') => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
      <span className="text-sm font-semibold text-gray-500 mr-2">Category Filter:</span>
      <button
        onClick={() => onSelectCategory('ALL')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer  ${
          selectedCategory === 'ALL'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-600 overflow-hidden shadow-lg hover:bg-gray-50 hover:scale-95'
        }`}
      >
        All Products
      </button>
      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelectCategory(c.id)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            selectedCategory === c.id
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 overflow-hidden shadow-lg hover:bg-gray-50 hover:scale-95'
          }`}
        >
          {c.cat_name}
        </button>
      ))}
    </div>
  );
}