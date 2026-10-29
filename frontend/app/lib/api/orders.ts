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
  payment_method?:string | null
  payment_status:string
  created_at: string
  items: OrderItem[]
}

export const sendOtp = () =>
  request<{ message: string }>('/orders/send-otp', {
    method: 'POST',
  })

export const placeOrder = (addressId: number,paymentMethod:string,otp:string) =>
  request<Order>('/orders/', {
    method: 'POST',
    body: JSON.stringify({ address_id: addressId,payment_method:paymentMethod ,otp:otp}),
  })

export const getUserOrders = () =>
  request<Order[]>(`/orders/`)