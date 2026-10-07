'use client'
import { useState,FormEvent } from "react";
import LoginForm from "@/app/components/loginform";
import Modal from "@/app/components/modal";
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
       
        <Modal
        isOpen={true}
        onClose={() => router.push('/')}
        title="login">
        <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={handleSubmit}
        onReset={resetForm}
        />
        </Modal>
        </div>
    )
}