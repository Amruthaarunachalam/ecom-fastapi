'use client';

import { useState } from "react";

interface cart{
    id:number,
    user_id:number,
    prod_id:number,
    quantiy:number
}
interface CartItemProps{
    prod_id:number,
    prod_name:string,
    image_url?:string,
    prod_price:number,
    quantity:number,
    line_total:number,
    onQuantityChange:(prod_id:number,newQuantity:number)=>void,
    onDelete:(prod_id:number)=>void
}
export default function CartItemCard({prod_id,
    prod_name,
    image_url,
    prod_price,
    quantity,
    line_total,
    onQuantityChange,
    onDelete}:CartItemProps){
  
    return(
<div>
    <div className="bg-white rounded-md border border-gray-200 grid grid-cols-[80px_1fr_120px_120px_100px_40px] items-center gap-4 p-4">
        {image_url?
        (<img src={image_url} alt={prod_name} className="w-20 h-20 object contain bg-gray-100"/>)
        :(
         <div className="w-20 h-20 bg-gray-100 flex items-center justify-center text-xs text-gray-400">No Image</div>
        )}
        
        <div>
            <p className="font-bold">{prod_name}</p>
        </div>
       
        
        <div className="flex items-center gap-2">
            <button onClick={()=>onQuantityChange(prod_id,quantity-1)} disabled={quantity <= 1}
              className="px-3 py-1 bg-gray-200 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">-</button>
            <span>{quantity}</span>
            <button onClick={()=>onQuantityChange(prod_id,quantity+1)}
                className="px-3 py-1 bg-gray-200 rounded cursor-pointer">+</button>
        </div>
         <p className="text-center">₹{prod_price}</p>

        <p className="text-right font-semibold">₹{line_total}</p>
         <button onClick={() => onDelete(prod_id)} className="text-red-600 cursor-pointer">✕</button>
        
    </div>
</div>

)}