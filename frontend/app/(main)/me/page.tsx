'use client';

import { useEffect, useState, FormEvent } from 'react';
import MyDetails from '@/app/components/userDetails';

import type { User } from '@/app/lib/api/user';
import { getUser, updateUser } from '@/app/lib/api/user';

export default function Details() {
  const [user, setUser] = useState<User | null>(null);

  const [name, setName] = useState('');
  const [phone_no, setPhone_no] = useState('');
  const [email, setEmail] = useState('');
  const [disable, setDisable] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadUser();
  }, []);

  const fillForm = (u: User) => {
    setName(u.name);
    setPhone_no(u.phone_no);
    setEmail(u.email);
  };

  const loadUser = async () => {
    try {
      const data = await getUser();
      setUser(data);
      fillForm(data);        // fill the inputs once the data has arrived
    } catch (err) {
      console.error('unable to fetch user', err);
    }
  };

  const cancelEdit = () => {
    if (user) fillForm(user);   // throw away unsaved changes
    setDisable(true);
    setError('');
  };

  const editDetails = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    const payload={
        name:name,
        phone_no:phone_no,
        email:email
    }
    try {
      const updated = await updateUser(payload);
      setUser(updated);
      fillForm(updated);
      setDisable(true);
      setMessage('Details updated');
    } catch (err: any) {
      setError(err.message);    // e.g. "Email already in use"
    }
  };

  return (
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

      {error && <p className="text-sm text-red-600">{error}</p>}
      {message && <p className="text-sm text-green-600">{message}</p>}

      {disable ? (
        <button
          key="edit"
          type="button"
          onClick={() => { setDisable(false); setMessage(''); }}
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
  );
}