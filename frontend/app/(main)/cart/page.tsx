'use client'

import { useState, useEffect } from "react"
import CartItemCard from "../../components/CartItemCard"
import SuccessModal from "../../components/successModal"

import { USER_ID } from '../../lib/config'
import { getCart, updateCartQuantity, removeCartItem } from '../../lib/api/cart'
import { placeOrder } from '../../lib/api/orders'
import type { Cart } from '../../lib/api/cart'



export default function Cart() {
  const [cart, setCart] = useState<Cart>({ items: [], subtotal: 0 })
  const [isSuccess, setIsSuccess] = useState(false);
 

  useEffect(() => {
    fetchCart()
  }, [])

 const fetchCart = async () => {
  try {
    setCart(await getCart())
  } catch (err) {
    console.error('Failed fetching cart items:', err)
  }
}


  const handleQuantityUpdate = async (prod_id: number, newQuantity: number) => {
  try {
    setCart(await updateCartQuantity( prod_id, newQuantity))
  } catch (err: any) {
    alert(err.message) // e.g. "Not enough stock"
  }
}

 const handleDeleteItem = async (prod_id: number) => {
  try {
    setCart(await removeCartItem(prod_id))
  } catch (err) {
    console.error('failed to delete the product', err)
  }
}

 const handlePlaceOrder = async () => {
  try {
    await placeOrder()
    setCart({ items: [], subtotal: 0 })
    setIsSuccess(true)
  } catch (err: any) {
    alert(err.message)
  }
}

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold uppercase text-gray-500">Your Cart</h2>
      
      {cart.items.length === 0 ? (
        <div className="p-8 bg-white rounded-xl text-center text-gray-500">
          No items in the cart!
        </div>
      ) : (
        <>
          {cart.items.map((item) => (
            <CartItemCard
              key={item.prod_id}
              {...item}
              onQuantityChange={handleQuantityUpdate}
              onDelete={handleDeleteItem}
            />
          ))}

          <div className="bg-white rounded-xl border border-gray-200 p-4 flex justify-end items-center gap-4">
           <h3 className="text-xl font-bold">Subtotal: ₹{cart.subtotal}</h3>
            <button
              onClick={handlePlaceOrder}
             className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
             >
              Proceed to order
            </button>
           </div>
        </>
      )}
      
       <SuccessModal 
          isOpen={isSuccess}
          successMsg="Order Placed Successfully!!"
          onClose={() => setIsSuccess(false)}
          />
    </div>
  )
}