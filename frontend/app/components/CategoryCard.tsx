'use client';

interface Category {
  id: number;
  cat_name: string;
  cat_description?: string;
}

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

export default function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between hover:scale-105">
      <div>
        <div className="h-44 bg-gray-100 relative">
          {category.cat_name && (
            <div className="w-full h-full flex items-center justify-center text-black-400 text-sm">
              {category.cat_name}
            </div>
          )}
        </div>
        <div className="p-4 space-y-2">
        
          {category.cat_description ? (
            <p className="text-gray-500 text-sm line-clamp-2">{category.cat_description}</p>
          ):(
            <p className="text-gray-500 text-sm line-clamp-2">No description available</p>
          )}
        </div>
      </div>

      <div className="p-4 pt-0 flex space-x-2">
        <button
          onClick={() => onEdit(category)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer hover:scale-105"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer hover:scale-105"
        >
          Delete
        </button>
      </div>
    </div>
  );
}