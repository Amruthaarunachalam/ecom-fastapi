'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Register } from '@/app/lib/api/auth';
import Link from 'next/link';
import UserForm from '@/app/components/UsersForm';
import SuccessModal from '@/app/components/successModal';


export default function RegisterForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [password,setPassword]=useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const router=useRouter()
 
  const resetForm = () => {
    setEditingId(null);
    setName('');
    setPhoneNo('');
    setEmail('');
    setIsOpen(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      name: name,
      phone_no: phoneNo,
      email: email,
      password:password
    };

    try {
    await Register(payload)
    setIsSuccess(true)
    router.push('/login')
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
     
      <div className="w-fit max-w-4xl rounded-md bg-white p-6 shadow-xl">
        
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold">Register</h2>
         </div>
        <UserForm
          editingId={editingId}
          Name={name}
          setName={setName}
          Phone_no={phoneNo}
          setPhone_no={setPhoneNo}
          Email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleSubmit}
          onReset={resetForm}
        />
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
       
        </div>
      </div>
      <SuccessModal
      successMsg='User Created Successfully!'
     isOpen={isSuccess}
     onClose={() => setIsSuccess(false)}
        >
      </SuccessModal>
    </div>
  );
}