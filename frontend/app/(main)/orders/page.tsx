'use client'

import { useState, useEffect } from 'react'
import { getUserOrders } from '../../lib/api/orders'
import { getProducts } from '../../lib/api/products'
import type { Order } from '../../lib/api/orders'
import type { Product } from '../../lib/api/products'

import { WS_URL } from '@/app/lib/config'

export default function OrderSummary() {
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const token=localStorage.getItem('access_token')
    const ws=new WebSocket(`${WS_URL}/ws?token=${token}`)
    ws.onopen=()=>{
      console.log("websocket connected succesfully")
    }
    ws.onerror=(error)=>{
      console.log("error connecting websocket",error)
    }
    ws.onmessage=(event)=>{
      console.log("message",event.data)
      fetchOrders()
      fetchProducts()
    }
    fetchOrders()
    fetchProducts()
    return () =>ws.close()
  }, [])

  const fetchOrders = async () => {
    try {
      setOrders(await getUserOrders())
    } catch (err) {
      console.log('error fetching orders', err)
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

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Your Orders</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Track and review your past orders.</p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
          No orders yet.
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">

      
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800/60">
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">Order #{order.id}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(order.created_at).toLocaleDateString(
                    'en-GB',{
                      day:'numeric',
                      month:'short',
                      year:'numeric'
                    }
                  )}
                </p>
              </div>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium capitalize text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">
                {order.status}
              </span>
            </div>

          
            <div className="grid grid-cols-1 gap-4 px-5 py-4 text-sm sm:grid-cols-3">
              {order.shipping_address && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Deliver to</p>
                  <p className="mt-1 text-gray-700 dark:text-gray-200">{order.shipping_address}</p>
                </div>
              )}

              {order.payment_method &&(
                order.payment_method==='cod'?(
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Payment method</p>
                    <p className="mt-1 text-gray-700 dark:text-gray-200">Cash On Delivery</p>
                  </div>
                ):(
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Payment method</p>
                    <p className="mt-1 text-gray-700 dark:text-gray-200">Card</p>
                  </div>
                )
              )}

              {order.payment_status &&(
                order.payment_status==='paid'?(
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Payment status</p>
                    <span className="mt-1 inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium capitalize text-green-700 dark:bg-green-500/20 dark:text-green-300">
                      {order.payment_status}
                    </span>
                  </div>
                ):(
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Payment status</p>
                    <span className="mt-1 inline-block rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium capitalize text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300">
                      {order.payment_status}
                    </span>
                  </div>
                )
              )}
            </div>

    
            <div className="divide-y divide-gray-100 border-t border-gray-100 px-5 dark:divide-gray-700 dark:border-gray-700">
              {order.items.map((item) => {
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

        
            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800/60">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total</span>
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">₹{order.total_amount}</span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}