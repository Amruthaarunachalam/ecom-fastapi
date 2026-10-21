import { request } from "../apiClient";
export interface Address{
    id:number,
    user_id:number,
    Address_line1:string,
    city:string,
    state:string,
    pincode:string,
    is_default:boolean
}
interface AddressPayload{
    Address_line1:string,
    city:string,
    state:string,
    pincode:string,
}
export const getAddress=()=>{
    return request<Address[]>('/addresses/')
}
export const updateAddress=(id:number,payload:AddressPayload)=>{
    return request<Address>(`/addresses/${id}`,{
        method:'PUT',
        body:JSON.stringify(payload),
        })
}
export const createAddress=(payload:AddressPayload)=>{
    return request<Address>('/addresses/',{
        method:'POST',
        body: JSON.stringify(payload),
    })
}
export const deleteAddress=(id:number)=>{
   return request(`/addresses/${id}`,{
        method:'DELETE'
    })
}