import { error } from "console";
import { BASE_URL } from "./config";

export async function request <T>(path:string,options:RequestInit={}):Promise<T>{
    const token=typeof window!=='undefined'?localStorage.getItem('access_token'):null;
    const res=await fetch(`${BASE_URL}${path}`,{
     ...options,
     headers:{
        'Content-Type':'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers
     },
    })
    const data=await res.json().catch(()=>null)

    if(!res.ok){
    if (res.status === 401 && !path.startsWith('/auth/') && typeof window !== 'undefined') {
      localStorage.removeItem('access_token')
      window.location.href = '/login'
    }
        const detail=data?.detail
        throw new Error(typeof detail==='string'?detail:JSON.stringify(detail) || 'something went wrong')
    }
    return data as T

}