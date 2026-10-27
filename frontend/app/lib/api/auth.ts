
import { request } from "../apiClient";

interface TokenResponse{
    access_token:string,
    token_type:string
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
     request<{ message: string }>('/auth/login',{
        method:'POST',
        body:JSON.stringify(payload)
    })

export const Register=(payload:RegisterPayload)=>
    request<RegisterResponse>('/auth/register',{
        method:'POST',
        body:JSON.stringify(payload)
    })

export const VerifyLoginOtp = (payload: { email: string, otp: string }) =>
    request<TokenResponse>('/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify(payload)
    })