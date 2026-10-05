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
  created_at: string
  items: OrderItem[]
}

export const placeOrder = (userId: number) =>
  request<Order>(`/orders/${userId}`, { method: 'POST' })

export const getUserOrders = (userId: number) =>
  request<Order[]>(`/orders/${userId}`)