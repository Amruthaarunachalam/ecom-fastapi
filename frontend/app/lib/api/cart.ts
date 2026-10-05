import { request } from '../apiClient'

export interface CartItem {
  prod_id: number
  prod_name: string
  image_url?: string
  prod_price: number
  quantity: number
  line_total: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
}

export const getCart = (userId: number) =>
  request<Cart>(`/cart/${userId}`)

export const addToCart = (userId: number, productId: number, quantity = 1) =>
  request(`/cart/${userId}/items`, {
    method: 'POST',
    body: JSON.stringify({ prod_id: productId, quantity }),
  })

export const updateCartQuantity = (userId: number, productId: number, quantity: number) =>
  request<Cart>(`/cart/${userId}/items`, {
    method: 'PUT',
    body: JSON.stringify({ prod_id: productId, quantity }),
  })

export const removeCartItem = (userId: number, productId: number) =>
  request<Cart>(`/cart/${userId}/items/${productId}`, { method: 'DELETE' })