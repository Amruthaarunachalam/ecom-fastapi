interface UserProps{
    name:string,
    setName:(val:string)=>void;
    phone_no:string,
    setPhone_no:(val:string)=>void;
    email:string,
    setEmail:(val:string)=>void;
    disable:boolean
}

const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 ' +
  'placeholder:text-gray-400 transition focus:border-purple-400 focus:outline-none ' +
  'focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:border-transparent ' +
  'disabled:bg-gray-50 disabled:text-gray-700 dark:disabled:bg-gray-700/40 dark:disabled:text-gray-300';

export default function MyDetails({name,setName,phone_no,setPhone_no,email,setEmail,disable}:UserProps){
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">
          Name
        </label>
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          <input id="name" type="text" placeholder="Name *" required value={name} disabled={disable}
            onChange={(e) => setName(e.target.value)} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">
          Phone number
        </label>
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
          <input id="phone" type="tel" placeholder="Phone number *" required value={phone_no} disabled={disable}
            onChange={(e) => setPhone_no(e.target.value)} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">
          Email
        </label>
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
          <input id="email" type="email" placeholder="Email *" required value={email} disabled={disable}
            onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </div>
      </div>
    </div>
  );
}