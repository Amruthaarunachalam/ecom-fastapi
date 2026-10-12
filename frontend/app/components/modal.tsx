'use client';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
   
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
     
      <div className="w-fit max-w-4xl rounded-md bg-white p-6 shadow-xl  dark:bg-gray-800">
        
        <div className="mb-4 flex items-center justify-between gap-4  dark:bg-gray-800 ">
          <h2 className="text-xl font-bold">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-black font-bold text-lg dark:text-white  hover:dark:text-gray-400 cursor-pointer"
          >
            ✕
          </button>
        </div>

       
        <div>{children}</div>
      </div>

    </div>
  );
}