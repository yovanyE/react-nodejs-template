import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Notification = ({ message, type }) => {
  const toastType = (type) => {
    switch (type) {
      case 'success':
        return toast.success(message);
      case 'error':
        return toast.error(message);
      case 'warning':
        return  toast.custom((t) => (
            <div
              style={{
                backgroundColor: '#F8F9FA',
                padding: '1rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '1rem',
                color: 'black',
              }}
            >
              <span style={{ color: '#C98800', paddingRight: '0.5rem', fontSize: '1rem' }}>⚠️</span>
              <p style={{ color: '#C98800', fontSize: '1rem', margin: 0 }}>{message}</p>
            </div>
          ));
      default:
        return toast;
    }
  };

   toastType(type);
  return <Toaster position="top-right" />;
};

export default Notification;
