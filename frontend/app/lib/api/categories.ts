import { request } from '../apiClient'

export interface Category {
  id: number
  cat_name: string
  cat_description?: string
}

export interface CategoryPayload {
  cat_name: string
  cat_description: string
}

export const getCategories = () => request<Category[]>('/category/')

export const createCategory = (payload: CategoryPayload) =>
  request<Category>('/category/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

export const updateCategory = (id: number, payload: CategoryPayload) =>
  request<Category>(`/category/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

export const deleteCategory = (id: number) =>
  request(`/category/${id}`, { method: 'DELETE' })