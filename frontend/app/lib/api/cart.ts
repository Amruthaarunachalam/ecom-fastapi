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

export const getCart = () =>
  request<Cart>(`/cart/`)

export const addToCart = ( productId: number, quantity = 1) =>
  request(`/cart/items`, {
    method: 'POST',
    body: JSON.stringify({ prod_id: productId, quantity }),
  })

export const updateCartQuantity = ( productId: number, quantity: number) =>
  request<Cart>(`/cart/items`, {
    method: 'PUT',
    body: JSON.stringify({ prod_id: productId, quantity }),
  })

export const removeCartItem = ( productId: number) =>
  request<Cart>(`/cart/items/${productId}`, { method: 'DELETE' })