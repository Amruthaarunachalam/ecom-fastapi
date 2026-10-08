
import { request } from "../apiClient";

interface TokenResponse{
    access_token:string,
    type:string
}
interface LoginPayload {
  email:string;
  password:string;
}
interface RegisterResponse{
    name:string,
    phone_no:string,
    email:string
}
export interface RegisterPayload{
    name:string,
    phone_no:string,
    email:string,
    password:string
}

export const Login=(payload:LoginPayload)=>
    request<TokenResponse>('/auth/login',{
        method:'POST',
        body:JSON.stringify(payload)
    })

export const Register=(payload:RegisterPayload)=>
    request<RegisterResponse>('/auth/register',{
        method:'POST',
        body:JSON.stringify(payload)
    })
