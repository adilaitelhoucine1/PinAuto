import { useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';

export default function Modal({ isOpen, onClose, title, children }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setShow(true));
      document.body.style.overflow = 'hidden';
    } else {
      setShow(false);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShow(false);
      setTimeout(onClose, 200);
    }
  };

  return (
    <div
      className={`
        fixed inset-0 z-[100] flex items-center justify-center p-4
        transition-all duration-300
        ${show ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent'}
      `}
      onClick={handleBackdropClick}
    >
      <div
        className={`
          relative w-full max-w-lg
          bg-white dark:bg-slate-800
          rounded-2xl shadow-2xl
          border border-gray-200 dark:border-slate-700
          transition-all duration-300 ease-out
          ${show ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={() => {
              setShow(false);
              setTimeout(onClose, 200);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <RiCloseLine className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
