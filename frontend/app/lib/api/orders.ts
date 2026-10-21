import { request } from '../apiClient'

export interface OrderItem {
  prod_id: number
  quantity: number
  price: number
}

export interface Order {
  id: number
  user_id: number
  total_amount: number
  status: string
  shipping_address?: string | null
  created_at: string
  items: OrderItem[]
}

export const placeOrder = (addressId: number) =>
  request<Order>('/orders/', {
    method: 'POST',
    body: JSON.stringify({ address_id: addressId }),
  })

export const getUserOrders = () =>
  request<Order[]>(`/orders/`)