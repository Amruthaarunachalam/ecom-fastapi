'use client'

import { useState, useEffect } from "react"
import CartItemCard from "../components/CartItemCard"
import SuccessModal from "../components/successModal"

interface CartItems {
  prod_id: number
  prod_name: string
  image_url?: string
  prod_price: number
  quantity: number
  line_total: number
}

interface Carts {
  items: CartItems[]
  subtotal: number
}

export default function Cart() {
  const [cart, setCart] = useState<Carts>({ items: [], subtotal: 0 })
  const [isSuccess, setIsSuccess] = useState(false);
  const BASE_URL = 'http://127.0.0.1:8000'
  const USER_ID = 1

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const res = await fetch(`${BASE_URL}/cart/${USER_ID}`)
      if (res.ok) {
        const data = await res.json()
        setCart(data)
      }
    } catch (err) {
      console.error('Failed fetching cart items:', err)
    }
  }

  const handleQuantityUpdate = async (prod_id: number, newQuantity: number) => {
    try {
      const res = await fetch(`${BASE_URL}/cart/${USER_ID}/items`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prod_id: prod_id, quantity: newQuantity }),
      })
      const data = await res.json()
      if (res.ok) {
        setCart(data)
      } else {
        alert(data.detail)
      }
    } catch (err) {
      console.error('failed to update', err)
    }
  }

  const handleDeleteItem = async (prod_id: number) => {
    try {
      const res = await fetch(`${BASE_URL}/cart/${USER_ID}/items/${prod_id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setCart(await res.json())
      }
    } catch (err) {
      console.error('failed to delete the product', err)
    }
  }

  const handlePlaceOrder = async () => {
  try {
    const res = await fetch(`${BASE_URL}/orders/${USER_ID}`, { method: 'POST' })
    console.log('order status:', res.status)

    const data = await res.json()
    console.log('order response:', data)

    if (res.ok) {
      setCart({ items: [], subtotal: 0 })
      console.log('order placed, opening modal')
      setIsSuccess(true)
    } else {
      alert(typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail))
    }
  } catch (err) {
    console.error('error placing an order', err)
    alert('Could not place the order. Check the console and the backend terminal.')
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