'use client';

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

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between">
      <div>
        <div className="h-44 bg-gray-100 relative">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.prod_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No Image Available
            </div>
          )}
        </div>
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-900 text-lg">{product.prod_name}</h3>
            <span className="text-green-600 font-bold">₹{product.prod_price}</span>
          </div>
          {product.prod_description && (
            <p className="text-gray-500 text-sm line-clamp-2">{product.prod_description}</p>
          )}
          <div className="flex items-center space-x-4 text-xs text-gray-500 pt-2">
            <span>Stock: <b>{product.available_stock || 0}</b></span>
            {product.prod_color && <span>Color: <b>{product.prod_color}</b></span>}
          </div>
        </div>
      </div>

      <div className="p-4 pt-0 flex space-x-2">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 rounded-md text-sm font-medium transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-1.5 rounded-md text-sm font-medium transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}