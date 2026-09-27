import React from 'react'

type Props = {
  open: boolean
  title?: string
  onClose?: () => void
  children?: React.ReactNode
}

export const Modal: React.FC<Props> = ({ open, title, onClose, children }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className="relative bg-white rounded shadow-lg max-w-lg w-full p-4 z-50">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">{title}</h3>
          <button className="text-gray-600" onClick={onClose} aria-label="close">✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal
