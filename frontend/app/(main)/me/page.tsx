'use client';

import { useEffect, useState, FormEvent } from 'react';

import MyDetails from '@/app/components/userDetails';
import MyAddressDetails from '@/app/components/AddressForm';
import Modal from '@/app/components/modal';

import type { User } from '@/app/lib/api/user';
import { getUser, updateUser } from '@/app/lib/api/user';
import type { Address } from '@/app/lib/api/address';
import { getAddress, updateAddress, createAddress } from '@/app/lib/api/address';



const primaryBtn =
  'inline-flex items-center gap-2 rounded-lg bg-purple-500 px-4 py-2 text-sm font-medium text-white ' +
  'shadow-sm transition hover:bg-purple-600 focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-purple-300 cursor-pointer';
const secondaryBtn =
  'inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm ' +
  'font-medium text-gray-700 transition hover:bg-gray-50 cursor-pointer ' +
  'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700';

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



  useEffect(() => {
    loadUser();
    loadAddress();
  }, []);

  // user functions
  const fillForm = (u: User) => {
    setName(u.name);
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

  // address functions
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

  const openEditModal = (a: Address) => {
    setEditingId(a.id);
    setAddress_line1(a.Address_line1);
    setCity(a.city);
    setState(a.state);
    setPincode(a.pincode);
    setIsOpen(true);
  };

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
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const initial = (user?.name || name || '?').charAt(0).toUpperCase();

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My account</h1>
      </div>

      {/* My details */}
      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center gap-4 border-b border-gray-100 p-6 dark:border-gray-700">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xl font-semibold text-purple-600 dark:bg-purple-500/20 dark:text-purple-300">
            {initial}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-gray-900 dark:text-gray-100">{user?.name || 'Your profile'}</h2>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={editDetails} className="space-y-6 p-6">
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
            <button key="edit" type="button" onClick={() => setDisable(false)} className={primaryBtn}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 3a2.8 2.8 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5z" /><path d="m15 5 4 4" /></svg> Edit details
            </button>
          ) : (
            <div className="flex gap-3">
              <button key="save" type="submit" className={primaryBtn}>Save changes</button>
              <button key="cancel" type="button" onClick={cancelEdit} className={secondaryBtn}>Cancel</button>
            </div>
          )}
        </form>
      </section>

      {/* My addresses */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Saved addresses</h2>
          <button onClick={openAddModal} className={primaryBtn}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg> Add address
          </button>
        </div>

        {addresses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 dark:border-gray-600 dark:bg-gray-800 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-8 w-8 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
            <p className="mt-3 font-medium text-gray-700 dark:text-gray-200">No addresses saved yet</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Add one to speed up checkout.</p>
            <button onClick={openAddModal} className={`${primaryBtn} mt-4`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg> Add address
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {addresses.map((a) => (
              <div
                key={a.id}
                className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-500 dark:bg-purple-500/20 dark:text-purple-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 wrap-break-word dark:text-gray-100">{a.Address_line1}</p>
                    <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                      {a.city}, {a.state} - {a.pincode}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => openEditModal(a)}
                  className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-purple-600 transition hover:bg-purple-50 cursor-pointer dark:text-purple-300 dark:hover:bg-purple-500/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 3a2.8 2.8 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5z" /><path d="m15 5 4 4" /></svg> Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <Modal isOpen={isOpen} onClose={closeModal} title={editingId ? 'Edit address' : 'Add address'}>
        <form onSubmit={handleAddressSubmit} className="space-y-5">
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
          <div className="flex gap-3">
            <button type="submit" className={primaryBtn}>
              {editingId ? 'Update address' : 'Save address'}
            </button>
            <button type="button" onClick={closeModal} className={secondaryBtn}>Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}