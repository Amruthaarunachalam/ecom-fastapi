import { error } from "console";
import { BASE_URL } from "./config";

export async function request <T>(path:string,options:RequestInit={}):Promise<T>{
    const res=await fetch(`${BASE_URL}${path}`,{
     ...options,
     headers:{
        'Content-Type':'application/json',
        ...options.headers
     },
    })
    const data=await res.json().catch(()=>null)

    if(!res.ok){
        const detail=data?.detail
        throw new Error(typeof detail==='string'?detail:JSON.stringify(detail) || 'something went wrong')
    }
    return data as T

}