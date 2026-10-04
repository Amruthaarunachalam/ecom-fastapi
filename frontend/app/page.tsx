'use client';

import { useState, useEffect, FormEvent } from 'react';
import UserForm from './components/UsersForm';
import Modal from './components/modal';
import SuccessModal from './components/successModal';

interface User {
  id: number;
  name: string;
  phone_no: string;
  email: string;
}

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const BASE_URL = 'http://127.0.0.1:8000';

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
    };

    try {
      const url = editingId ? `${BASE_URL}/users/${editingId}` : `${BASE_URL}/users/`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        resetForm(); // Safely resets form and closes modal on success
        setIsOpen(false)
        setIsSuccess(true)
      } else {
        console.error('Failed to save user:', res.statusText);
      }
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <button
        onClick={() => {
          resetForm();
          setIsOpen(true);
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 cursor-pointer hover:scale-105 transition-all"
      >
        Sign Up
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={editingId ? "Edit User" : "Sign Up"}
      >
        <UserForm
          editingId={editingId}
          Name={name}
          setName={setName}
          Phone_no={phoneNo}
          setPhone_no={setPhoneNo}
          Email={email}
          setEmail={setEmail}
          onSubmit={handleSubmit}
          onReset={resetForm}
        />
      </Modal>
      <SuccessModal
      successMsg='User Created Successfully!'
     isOpen={isSuccess}
     onClose={() => setIsSuccess(false)}
>
 
</SuccessModal>
    </div>
  );
}