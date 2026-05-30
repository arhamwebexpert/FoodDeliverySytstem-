import React, { useContext } from 'react'
import './Toast.css'
import { StoreContext } from '../../context/StoreContext'

const Toast = () => {
  const { toasts, removeToast } = useContext(StoreContext)

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <span className="toast-icon">{toast.type === 'success' ? '✓' : '✕'}</span>
          <p className="toast-message">{toast.message}</p>
          <button className="toast-close" onClick={() => removeToast(toast.id)}>×</button>
        </div>
      ))}
    </div>
  )
}

export default Toast
