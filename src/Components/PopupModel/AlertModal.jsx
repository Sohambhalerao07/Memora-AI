import React, { useEffect } from 'react';

const AlertModal = ({ type = 'success', message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // auto close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
  };

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`border-l-4 p-4 rounded shadow-md w-80 ${colors[type]}`}>
        <div className="flex justify-between items-center">
          <p className="text-sm">{message}</p>
          <button onClick={onClose} className="text-sm font-bold ml-4">✖</button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
