import { request } from "../apiClient"
export interface User{
    id:number,
    name:string,
    phone_no:string,
    email:string
}
export interface UserPayload{
    name:string,
    phone_no:string,
    email:string
}
export const getUser=()=>{
    return request<User>('/users/me')
}
export const updateUser=(payload:UserPayload)=>{
    request<User>('/users/me',{
        method:'PUT',
        body:JSON.stringify(payload)
    })
}