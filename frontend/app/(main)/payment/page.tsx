'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { placeOrder, sendOtp } from '../../lib/api/orders'
import { getCart } from '@/app/lib/api/cart'
import SuccessModal from '../../components/successModal'

export default function Payment() {
  const router = useRouter()
  const params = useSearchParams()
  const addressId = Number(params.get('address'))

  const [method, setMethod] = useState<'cod' | 'card'>('cod')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [total,setTotal]=useState(0)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')

  useEffect(()=>{
    const loadTotal=async()=>{
        try{
            const cart=await getCart()
            setTotal(cart.subtotal)
        }
        catch(err){
            console.error("failed to load total",err)
        }
    }
    loadTotal()
},[])

const handleSendOtp = async () => {
  setError('')

  if (method === 'card') {
    if (cardNumber.replace(/\s/g,'').length !== 16 || !expiry || cvv.length < 3) {
      setError('Please enter valid card details')
      return
    }
  }

  try {
    await sendOtp()
    setOtpSent(true)
  } catch (err: any) {
    setError(err.message)
  }
}

  const handleConfirm = async () => {
  setError('')
  try {
    await placeOrder(addressId, method, otp)
    setSuccessMsg(
      method === 'card'
        ? 'Payment successful! Order placed.'
        : 'Order placed! Pay on delivery.'
    )
  } catch (err: any) {
    setError(err.message)
  }
}

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold uppercase text-gray-500">Payment</h2>

      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <div className="flex justify-between font-semibold text-lg">
       <span>Total to pay</span>
          <span>₹{total}</span>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="radio" checked={method === 'cod'} onChange={() => setMethod('cod')} />
          Cash on Delivery
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="radio" checked={method === 'card'} onChange={() => setMethod('card')} />
          Credit / Debit Card
        </label>

        {method === 'card' && (
          <div className="space-y-2 pt-2">
            <input
              className="border rounded p-2 w-full"
              placeholder="Card number (16 digits)"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <div className="flex gap-2">
              <input
                className="border rounded p-2 w-full"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
              <input
                className="border rounded p-2 w-full"
                placeholder="CVV"
                type="password"
                value={cvv}
                maxLength={3}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </div>
        )}

        {error && <p className="text-red-600 text-center text-sm">{error}</p>}

        {!otpSent ? (
  <button
    onClick={handleSendOtp}
    className="w-full px-4 py-2 bg-purple-400 text-white rounded-md cursor-pointer"
  >
    {method === 'card' ? `Pay ₹${total}` : 'Place order'}
  </button>
) : (
  <div className="space-y-2">
    <p className="text-sm text-gray-500">Enter the 6-digit OTP</p>
    <input
      className="border rounded p-2 w-full"
      placeholder="OTP"
      maxLength={6}
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
    />
    <button
      onClick={handleConfirm}
      className="w-full px-4 py-2 bg-purple-400 text-white rounded-md cursor-pointer"
    >
      Verify & place order
    </button>
    <button onClick={handleSendOtp} className="text-sm text-blue-600 hover:underline cursor-pointer">
      Resend OTP
    </button>
  </div>
)}
        <button 
        onClick={()=>router.push('/cart')}
          className="w-full px-4 py-2 bg-red-400 text-white rounded-md disabled:opacity-50 cursor-pointer">
           {method==='card'? 'cancel payment':'cancel order'} 
            </button>
      </div>

      <SuccessModal
        isOpen={successMsg !== ''}
        successMsg={successMsg}
        onClose={() => router.push('/orders')}
      />
    </div>
  )
}

