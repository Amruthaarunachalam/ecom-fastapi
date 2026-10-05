'use client';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  successMsg:string;
}

export default function SuccessModal({ isOpen, onClose,successMsg }: ModalProps) {
  console.log('SuccessModal isOpen =', isOpen)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl text-center space-y-4">
        
        {/* Close Button Header */}
        <div className="flex justify-end">
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-black font-bold text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

       
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        
        <h3 className="text-lg font-semibold text-gray-800">
          {successMsg}
        </h3>   
      </div>
    </div>
  );
}