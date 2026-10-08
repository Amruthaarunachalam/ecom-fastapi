import { request } from '../apiClient'

export interface Category {
  id: number
  cat_name: string
  cat_description?: string
}

export interface Product {
  id: number
  prod_name: string
  category_id: number
  prod_description?: string
  prod_color?: string
  prod_price: number
  available_stock?: number
  image_url?: string
}

// what the form sends when creating or updating a product
export interface ProductPayload {
  prod_name: string
  category_id: number
  prod_price: number
  available_stock: number
  prod_color: string
  image_url: string
  prod_description: string
}



export const getProducts = (catId?: number | 'ALL') => {
  if (catId !== undefined && catId !== 'ALL') {
    return request<Product[]>(`/products/?category_id=${catId}`)
  }
  return request<Product[]>('/products/')
}

export const createProduct = (payload: ProductPayload) =>
  request<Product>('/products/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

export const updateProduct = (id: number, payload: ProductPayload) =>
  request<Product>(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

export const deleteProducts = (id: number) =>
  request(`/products/${id}`, { method: 'DELETE' })