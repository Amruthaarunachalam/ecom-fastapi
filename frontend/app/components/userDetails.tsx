interface UserProps{
    name:string,
    setName:(val:string)=>void;
    phone_no:string,
    setPhone_no:(val:string)=>void;
    email:string,
    setEmail:(val:string)=>void;
    disable:boolean
}

export default function MyDetails({name,setName,phone_no,setPhone_no,email,setEmail,disable}:UserProps){
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 dark:bg-gray-800 dark:border">
            Name :
            <input
          type="text"
          placeholder="Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={disable}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder:text-gray-400 shadow-sm transition-all duration-150 hover:border-gray-400 focus:outline-none 
          focus:ring-2 focus:ring-purple-400 focus:border-purple-400 dark:bg-gray-800"
        /><br></br>
        phone Number:
         <input
          type="text"
          placeholder="phone no *"
          value={phone_no}
          onChange={(e) => setPhone_no(e.target.value)}
          required
          disabled={disable}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder:text-gray-400 shadow-sm transition-all duration-150 hover:border-gray-400 focus:outline-none 
          focus:ring-2 focus:ring-purple-400 focus:border-purple-400 dark:bg-gray-800"
          /><br></br>
          Email:
          <input
          type="text"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={disable}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder:text-gray-400 shadow-sm transition-all duration-150 hover:border-gray-400 focus:outline-none 
          focus:ring-2 focus:ring-purple-400 focus:border-purple-400 dark:bg-gray-800"
          />
        </div>
    )

}