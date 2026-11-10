'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUser } from '@/app/lib/api/user'
import { getAllOrders, updateOrderStatus } from '@/app/lib/api/orders'
import type { Order } from '@/app/lib/api/orders'
import { getProducts } from '../../lib/api/products'
import type { Product } from '../../lib/api/products'

export default function ManageOrders() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState('')
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    loadPage()
    fetchProducts()
  }, [])

  const loadPage = async () => {
    try {
      const me = await getUser()
      if (me.role !== 'admin') {
        router.replace('/products')      
        return
      }
      setIsAdmin(true)
      setOrders(await getAllOrders())
    } catch (err: unknown) {
      setError(err instanceof Error?err.message:"something went wrong")
    }
  }

  const changeStatus = async (orderId: number, status: string) => {
    setError('')
    try {
      const updated = await updateOrderStatus(orderId, status)
      setOrders(orders.map((o) => (o.id === updated.id ? updated : o)))
    } catch (err: unknown) {
      setError(err instanceof Error?err.message:"something went wrong")
    }
  }

   const fetchProducts = async () => {
    try {
      setProducts(await getProducts())
    } catch (err) {
      console.log('unable to fetch products', err)
    }
  }

  const findProduct = (prod_id: number) => products.find((p) => p.id === prod_id)
  if (!isAdmin) return null

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold uppercase text-gray-500">Manage orders</h2>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {orders.length === 0 ? (
        <div className="p-8 bg-white rounded-xl text-center text-gray-500">
          No orders yet.
        </div>
      ) : (
        orders.map((o) => (
          <div key={o.id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
            <div className="flex justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(o.created_at).toLocaleDateString(
                    'en-GB',{
                      day:'numeric',
                      month:'short',
                      year:'numeric'
                    }
                  )}
                </p>
                 <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                </div>
            <div className="flex justify-between">
              <span className="font-semibold">Order #{o.id}</span>
              <span className="font-semibold">₹{o.total_amount}</span>  
            </div>

            <p className="text-sm text-gray-500">{o.shipping_address}</p>

            <p className="text-sm">
              Status: <b>{o.status}</b> | Payment: {o.payment_method} ({o.payment_status})
            </p>
              <div className="divide-y divide-gray-100 border-t border-gray-100 px-5 dark:divide-gray-700 dark:border-gray-700">
              {o.items.map((item) => {
                const prod = findProduct(item.prod_id)
                return (
                  <div key={item.prod_id} className="flex items-center gap-4 py-4">
                    {prod?.image_url ? (
                      <img src={prod.image_url} alt={prod.prod_name} className="h-16 w-16 shrink-0 rounded-lg bg-gray-100 object-contain dark:bg-gray-700" />
                    ) : (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400 dark:bg-gray-700">
                        No Image
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-gray-900 dark:text-gray-100">{prod ? prod.prod_name : `Product #${item.prod_id}`}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">₹{item.price} × {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">₹{item.price * item.quantity}</p>
                  </div>
                )
              })}
            </div>
            {o.status === 'placed' && (
              <button
                onClick={() => changeStatus(o.id, 'shipped')}
                className="px-4 py-2 bg-purple-400 text-white rounded-md cursor-pointer"
              >
                Mark as shipped
              </button>
            )}

            {o.status === 'shipped' && (
              <button
                onClick={() => changeStatus(o.id, 'delivered')}
                className="px-4 py-2 bg-purple-400 text-white rounded-md cursor-pointer"
              >
                Mark as delivered
              </button>
            )}

            {o.status === 'delivered' && (
              <p className="text-sm text-green-600">Delivered</p>
            )}
          </div>
        ))
      )}
    </div>
  )
}