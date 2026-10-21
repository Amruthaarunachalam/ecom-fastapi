'use client';

import { useEffect, useState, FormEvent } from 'react';
import MyDetails from '@/app/components/userDetails';
import MyAddressDetails from '@/app/components/AddressForm';
import Modal from '@/app/components/modal';

import type { User } from '@/app/lib/api/user';
import { getUser, updateUser } from '@/app/lib/api/user';
import type { Address } from '@/app/lib/api/address';
import { getAddress, updateAddress, createAddress } from '@/app/lib/api/address';

import { useRouter } from 'next/navigation';


export default function Details() {
  // user 
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [phone_no, setPhone_no] = useState('');
  const [email, setEmail] = useState('');
  const [disable, setDisable] = useState(true);


  // address
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isOpen, setIsOpen] = useState(false);            
  const [editingId, setEditingId] = useState<number | null>(null);
  const [Address_line1, setAddress_line1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  
  const router = useRouter();

  useEffect(() => {
    loadUser();
    loadAddress();
    const params = new URLSearchParams(window.location.search);
if (params.get('add') === '1') setIsOpen(true);
  }, []);

  //user functions
  const fillForm = (u: User) => {
    setName(u.name);
    setPhone_no(u.phone_no);
    setEmail(u.email);
  };

  const loadUser = async () => {
    try {
      const data = await getUser();
      setUser(data);
      fillForm(data);
    } catch (err) {
      console.error('unable to fetch user', err);
    }
  };

  const cancelEdit = () => {
    if (user) fillForm(user);
    setDisable(true);
  };

  const editDetails = async (e: FormEvent) => {
    e.preventDefault();
    const payload = { name, phone_no, email };
    try {
      const updated = await updateUser(payload);
      setUser(updated);
      fillForm(updated);
      setDisable(true);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // address funcions
  const loadAddress = async () => {
    try {
      setAddresses(await getAddress());
    } catch (err) {
      console.error('unable to fetch address', err);
    }
  };

  const clearAddressForm = () => {
    setEditingId(null);
    setAddress_line1('');
    setCity('');
    setState('');
    setPincode('');
  };

  const openAddModal = () => {
    clearAddressForm();          
    setIsOpen(true);
  };

 const  openEditModal=(a:Address)=>{
     setEditingId(a.id)
     setAddress_line1(a.Address_line1)
     setCity(a.city)
     setState(a.state)
     setPincode(a.pincode)
     setIsOpen(true)
 }

  const closeModal = () => {
    clearAddressForm();
    setIsOpen(false);
  };

  const handleAddressSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = { Address_line1, city, state, pincode };
    try {
      if (editingId) {
        await updateAddress(editingId, payload);
      } else {
        await createAddress(payload);
      }
      await loadAddress();      
      closeModal();

      const returnTo = new URLSearchParams(window.location.search).get('returnTo');
    if (returnTo && returnTo.startsWith('/') && !returnTo.startsWith('//')) {
      router.push(returnTo);
    } }catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="space-y-10">
      {/* My details */}
      <form onSubmit={editDetails} className="space-y-4 max-w-md">
        <h2 className="text-2xl font-bold uppercase text-gray-500">My Details</h2>

        <MyDetails
          name={name}
          setName={setName}
          phone_no={phone_no}
          setPhone_no={setPhone_no}
          email={email}
          setEmail={setEmail}
          disable={disable}
        />

        {disable ? (
          <button
            key="edit"
            type="button"
            onClick={() => { setDisable(false) }}
            className="px-4 py-2 bg-purple-400 text-white rounded-md cursor-pointer"
          >
            Edit
          </button>
        ) : (
          <div className="flex space-x-3">
            <button key="save" type="submit" className="px-4 py-2 bg-purple-400 text-white rounded-md cursor-pointer">
              Save
            </button>
            <button key="cancel" type="button" onClick={cancelEdit} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer">
              Cancel
            </button>
          </div>
        )}
      </form>



      {/*  My addresses */}
      <div className="space-y-4">
        <div className="flex items-center justify-between max-w-3xl">
          <h2 className="text-2xl font-bold uppercase text-gray-500">My Addresses</h2>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-purple-400 text-white rounded-md cursor-pointer"
          >
            + Add Address
          </button>
        </div>

        {addresses.length === 0 ? (
          <div className="p-8 bg-white rounded-xl text-center text-gray-500 max-w-3xl">
            No addresses saved yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
            {addresses.map((a) => (
              <div key={a.id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <p className="font-semibold text-gray-900">{a.Address_line1}</p>
                </div>
                <p className="text-sm text-gray-600">{a.city}, {a.state} - {a.pincode}</p>
                <button
                  onClick={() => openEditModal(a)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm cursor-pointer"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={editingId ? 'Edit Address' : 'Add Address'}
      >

        <form onSubmit={handleAddressSubmit} className="space-y-4">
          <MyAddressDetails
            Address_line1={Address_line1}
            setAddress_line1={setAddress_line1}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            pincode={pincode}
            setPincode={setPincode}
            disable={false}
          />

          <div className="flex space-x-3">
            <button type="submit" className="px-4 py-2 bg-purple-400 text-white rounded-md cursor-pointer">
              {editingId ? 'Update Address' : 'Save Address'}
            </button>
            <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}