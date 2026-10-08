'use client'
import { useState,FormEvent } from "react";
import LoginForm from "@/app/components/loginform";
import { Login } from "@/app/lib/api/auth";
import { useRouter } from "next/navigation";
export default function LoginPage(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const router=useRouter()


    const resetForm=()=>{
        setEmail(''),
        setPassword('')
    }
    const handleSubmit=async(e:FormEvent)=>{
        e.preventDefault()
        const payload={
            email:email,
            password:password
        }
        try{
        const data=await Login(payload)
        localStorage.setItem('access_token',data.access_token)
        router.push('/products')
        }catch (err){
            console.error("error loggin in",err)
        }
    }
    return(
       <div className="p-6" >
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
     
      <div className="w-fit max-w-4xl rounded-md bg-white p-6 shadow-xl">
        
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold">Login</h2>
         </div>
        <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={handleSubmit}
        onReset={resetForm}
        />
        </div>
        </div>
        </div>
    )
}