
import { request } from "../apiClient";

interface TokenResponse{
    access_token:string,
    type:string
}
interface LoginPayload {
  email:string;
  password:string;
}
export const Login=(payload:LoginPayload)=>
    request<TokenResponse>('/auth/login',{
        method:'POST',
        body:JSON.stringify(payload)
    })
