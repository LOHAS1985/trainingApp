import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export const Button: React.FC<Props> = ({ variant = 'primary', className = '', children, ...rest }) => {
  const base = 'px-4 py-2 rounded focus:outline-none'
  const variantCls = variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  return (
    <button className={`${base} ${variantCls} ${className}`} {...rest}>
      {children}
    </button>
  )
}

export default Button
