'use client'
import { useState,FormEvent } from "react";
import LoginForm from "@/app/components/loginform";
import { Login , VerifyLoginOtp,GoogleLoginRequest} from "@/app/lib/api/auth";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider,GoogleLogin } from "@react-oauth/google";

const clientID=process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '1087491101723-727sdlbs46d8mpft4hfcm9sc3un8rfl3.apps.googleusercontent.com'

export default function LoginPage(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('')
    const router=useRouter()
    const [otpSent, setOtpSent] = useState(false)
    const [otp, setOtp] = useState('')

const requestOtp = async () => {
    setError('')
    try {
        await Login({ email, password })
        setOtpSent(true)
        setOtp('')
    } catch (err: any) {
        setError(err.message)
    }
}

    const resetForm=()=>{
        setEmail(''),
        setPassword('')
        setError('')
        setOtpSent(false)
        setOtp('')
    }
    const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    requestOtp()
}
const handleVerifyOtp = async () => {
    setError('')
    try {
        const data = await VerifyLoginOtp({ email, otp })
        localStorage.setItem('access_token', data.access_token)
        router.push('/products')
    } catch (err: any) {
        setError(err.message)
    }
  }

    const handleGoogleLogin=async(res:any)=>{
      setError('')
      try{
        const data=await GoogleLoginRequest({credential:res.credential})
        localStorage.setItem('access_token',data.access_token)
        router.push('/products')
      }
      catch (err:any){
        setError(err.message)
      }

    }

    return(
       <div className="p-6" >
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
     
      <div className="w-fit max-w-4xl rounded-md bg-white dark:bg-gray-800 p-6 shadow-xl">
        
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold">Login</h2>
         </div>
        {!otpSent ? (
          <div>
  <LoginForm
    email={email}
    setEmail={setEmail}
    password={password}
    setPassword={setPassword}
    onSubmit={handleSubmit}
    onReset={resetForm}
  />
  <div className="mt-4 flex justify-center">
    <GoogleOAuthProvider clientId={clientID!}>
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => setError('Google sign-in failed')}
      />
    </GoogleOAuthProvider>
  </div>
  </div>
) : (
  <div className="space-y-2">
    <p className="text-sm text-gray-500">Enter the 6-digit OTP sent to your email {email}</p>
    <input
      className="border rounded p-2 w-full"
      placeholder="OTP"
      maxLength={6}
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
    />
    <button
      onClick={handleVerifyOtp}
      className="w-full px-4 py-2 bg-purple-400 text-white rounded-md cursor-pointer"
    >
      Verify & login
    </button>
    <button onClick={requestOtp} className="text-sm text-blue-600 hover:underline cursor-pointer">
      Resend OTP
    </button>
  </div>
)}
        <div>
        {error &&(
        <p className="md:col-span-3 text-sm text-center text-red-600">{error}</p>
        )}
        </div>
        </div>
        </div>
        </div>
    )
}