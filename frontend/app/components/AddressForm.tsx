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

const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-gray-900 transition dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 ' +
  'focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-200 ' +
  'disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-700/40';

const labelClass = 'mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-300';

export default function MyAddressDetails({Address_line1,setAddress_line1,city,setCity,state,setState,pincode,setPincode,disable}:AddressProps){
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="addr1" className={labelClass}>Address</label>
        <input id="addr1" type="text" required value={Address_line1} disabled={disable}
          placeholder="Door no, street name, area *"
          onChange={(e) => setAddress_line1(e.target.value)} className={inputClass} />
      </div>
      <div>
        <label htmlFor="city" className={labelClass}>City</label>
        <input id="city" type="text" required value={city} disabled={disable}
          onChange={(e) => setCity(e.target.value)} className={inputClass} />
      </div>
      <div>
        <label htmlFor="state" className={labelClass}>State</label>
        <input id="state" type="text" required value={state} disabled={disable}
          onChange={(e) => setState(e.target.value)} className={inputClass} />
      </div>
      <div>
        <label htmlFor="pincode" className={labelClass}>Pincode</label>
        <input id="pincode" type="text" required inputMode="numeric" maxLength={6}
          value={pincode} disabled={disable}
          onChange={(e) => setPincode(e.target.value)} className={inputClass} />
      </div>
    </div>
  );
}