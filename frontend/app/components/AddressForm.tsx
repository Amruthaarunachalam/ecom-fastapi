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
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 dark:bg-gray-800 dark:border">
            Address Line:
            <input
          type="text"
          placeholder="Enter door no, street name,area *"
          value={Address_line1}
          onChange={(e) => setAddress_line1(e.target.value)}
          required
          disabled={disable}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder:text-gray-400 shadow-sm transition-all duration-150 hover:border-gray-400 focus:outline-none 
          focus:ring-2 focus:ring-purple-400 focus:border-purple-400 dark:bg-gray-800"
        /><br></br>
        City:
         <input
          type="text"
          placeholder="city *"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          disabled={disable}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder:text-gray-400 shadow-sm transition-all duration-150 hover:border-gray-400 focus:outline-none 
          focus:ring-2 focus:ring-purple-400 focus:border-purple-400 dark:bg-gray-800"
          /><br></br>
          State:
          <input
          type="text"
          placeholder="state *"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          disabled={disable}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder:text-gray-400 shadow-sm transition-all duration-150 hover:border-gray-400 focus:outline-none 
          focus:ring-2 focus:ring-purple-400 focus:border-purple-400 dark:bg-gray-800"
          />
          <br></br>
          Pincode:
          <input
          type="text"
          placeholder="pincode *"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          required
          disabled={disable}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder:text-gray-400 shadow-sm transition-all duration-150 hover:border-gray-400 focus:outline-none 
          focus:ring-2 focus:ring-purple-400 focus:border-purple-400 dark:bg-gray-800"
          />
        </div>
    )

}