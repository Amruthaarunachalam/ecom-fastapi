interface AddressProps{
    Address_line1:string,
    setAddress_line1:(val:string)=>void;
    city:string,
    setCity:(val:string)=>void;
    state:string,
    setState:(val:string)=>void;
    pincode:string,
    setPincode:(val:string)=>void;
    disable:boolean /* still need to add is_default field */
}

export default function MyAddressDetails({Address_line1,setAddress_line1,city,setCity,state,setState,pincode,setPincode,disable}:AddressProps){
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="addr1" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">Address</label>
        <input
          id="addr1"
          type="text"
          placeholder="Enter door no, street name,area *"
          value={Address_line1}
          onChange={(e) => setAddress_line1(e.target.value)}
          required
          disabled={disable}
          className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition hover:border-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-purple-500/30 dark:disabled:bg-gray-700/40"
        />
      </div>
      <div>
        <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">City</label>
        <input
          id="city"
          type="text"
          placeholder="city *"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          disabled={disable}
          className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition hover:border-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-purple-500/30 dark:disabled:bg-gray-700/40"
        />
      </div>
      <div>
        <label htmlFor="state" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">State</label>
        <input
          id="state"
          type="text"
          placeholder="state *"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          disabled={disable}
          className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition hover:border-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-purple-500/30 dark:disabled:bg-gray-700/40"
        />
      </div>
      <div>
        <label htmlFor="pincode" className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300">Pincode</label>
        <input
          id="pincode"
          type="text"
          placeholder="pincode *"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          maxLength={6}
          required
          disabled={disable}
          className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition hover:border-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-purple-500/30 dark:disabled:bg-gray-700/40"
        />
      </div>
    </div>
  );
}