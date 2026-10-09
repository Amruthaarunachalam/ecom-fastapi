'use client'

import { useState, useEffect } from 'react'
import { getUserOrders } from '../../lib/api/orders'
import { getProducts } from '../../lib/api/products'
import type { Order } from '../../lib/api/orders'
import type { Product } from '../../lib/api/products'

export default function OrderSummary() {
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetchOrders()
    fetchProducts()
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold uppercase text-gray-500">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="p-8 bg-white rounded-xl text-center text-gray-500">
          No orders yet.
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
            <div className="flex justify-between text-sm text-gray-500">
              <span className="font-semibold">Order #{order.id}</span>
              <span>placed order at:{new Date(order.created_at).toLocaleDateString()}</span>
              <span className="capitalize">{order.status}</span>
            </div>

            {order.items.map((item) => {
              const prod = findProduct(item.prod_id)
              return (
                <div key={item.prod_id} className="flex items-center gap-4 border-t pt-3">
                  {prod?.image_url ? (
                    <img src={prod.image_url} alt={prod.prod_name} className="w-16 h-16 object-contain bg-gray-100" />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                      No Image
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-bold">{prod ? prod.prod_name : `Product #${item.prod_id}`}</p>
                    <p className="text-sm text-gray-500">₹{item.price} × {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                </div>
              )
            })}

            <div className=" pt-3 text-right text-lg font-bold">
              Total: ₹{order.total_amount}
            </div>
          </div>
        ))
      )}
    </div>
  )
}