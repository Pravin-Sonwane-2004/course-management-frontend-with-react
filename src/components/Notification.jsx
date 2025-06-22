import React from 'react';

export default function Notification({ message, type, onClose }) {
  if (!message) return null;
  return (
    <div className={`p-2 mb-2 rounded ${type === 'error' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}
         role="alert">
      <div className="flex justify-between items-center">
        <span>{message}</span>
        {onClose && (
          <button className="ml-4 text-lg font-bold" onClick={onClose}>&times;</button>
        )}
      </div>
    </div>
  );
}
