'use client'

import { useState, useEffect } from "react"
import CartItemCard from "../../components/CartItemCard"
import SuccessModal from "../../components/successModal"
import Modal from "@/app/components/modal"

import { getCart, updateCartQuantity, removeCartItem } from '../../lib/api/cart'
import { placeOrder } from '../../lib/api/orders'
import type { Cart } from '../../lib/api/cart'
import { getUser } from '../../lib/api/user'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getAddress } from '@/app/lib/api/address'
import type { Address } from '@/app/lib/api/address'

export default function Cart() {
  const [cart, setCart] = useState<Cart>({ items: [], subtotal: 0 })
  const [isSuccess, setIsSuccess] = useState(false);
  const router=useRouter()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)
  const [addressesLoaded, setAddressesLoaded] = useState(false)
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [showAddressModal, setShowAddressModal] = useState(false)
  useEffect(() => {
    
    fetchCart()
    loadAddresses()
    
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
    alert(err.message) 
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
  if (!addressesLoaded) return
  
  // no address yet: go and add one,  
  if (addresses.length === 0) {
    setShowAddressModal(true)
    return
  }

  if (selectedAddressId === null) {
    <Modal isOpen={true}
     onClose={()=>{false}}
     title="Alert"
    >
      Please choose a delivery addresss
    </Modal>
    
    return
  }

  try {
    try {
  const me = await getUser()
  if (!me.phone_no) {
    setShowPhoneModal(true)
    return
  }
} catch (err: any) {
  alert(err.message)
  return
}
    router.push(`/payment?address=${selectedAddressId}`)
   // await placeOrder(selectedAddressId)
   // setCart({ items: [], subtotal: 0 })
   // setIsSuccess(true)
  } catch (err: any) {
    alert(err.message)
  }
}

const loadAddresses = async () => {
  try {
    const data = await getAddress()
    setAddresses(data)
    const preferred = data.find((a) => a.is_default) ?? data[0]   // default first
    setSelectedAddressId(preferred ? preferred.id : null)
  } catch (err) {
    console.error('unable to fetch addresses', err)
  } finally {
    setAddressesLoaded(true)
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
          <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
  <h3 className="font-semibold text-gray-700">Deliver to</h3>

  {addressesLoaded && addresses.length === 0 ? (
    <p className="text-sm text-gray-500">
      No address saved yet . Add one in your account to place the order.
    </p>
  ) : (
    addresses.map((a) => (
      <label key={a.id} className="flex items-start gap-3 text-sm cursor-pointer">
        <input
          type="radio"
          name="address"
          checked={selectedAddressId === a.id}
          onChange={() => setSelectedAddressId(a.id)}
        />
        <span>
          {a.Address_line1}, {a.city}, {a.state} - {a.pincode}
          {a.is_default && <b> (Default)</b>}
        </span>
      </label>
    ))
  )}

  <Link href="/me" className="text-sm text-blue-600 hover:underline">
    Add or edit addresses
  </Link>
</div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 flex justify-end items-center gap-4">
           <h3 className="text-xl font-bold">Subtotal: ₹{cart.subtotal}</h3>
            <button
              onClick={handlePlaceOrder}
             className="px-4 py-2 bg-purple-400 text-white rounded-md cursor-pointer"
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


          <Modal
  isOpen={showPhoneModal}
  onClose={() => setShowPhoneModal(false)}
  title="Phone number required"
>
  <p className="text-sm text-gray-600 mb-3">
    Please add your phone number in your account to proceed with the order.
  </p>
  <button
    onClick={() => router.push('/me')}
    className="px-4 py-2 bg-purple-400 text-white rounded-md cursor-pointer"
  >
    Go to My Account
  </button>
</Modal>

<Modal
  isOpen={showAddressModal}
  onClose={() => setShowAddressModal(false)}
  title="Address required"
>
  <p className="text-sm text-gray-600 mb-3">
    Please add a delivery address in your account to proceed with the order.
  </p>
  <button
    onClick={() => router.push('/me')}
    className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
  >
    Go to My Account
  </button>
</Modal>
    </div>
  )
}