import React from 'react'

type Props = {
  className?: string
  children?: React.ReactNode
}

export const Card: React.FC<Props> = ({ children, className = '' }) => {
  return <div className={`bg-white shadow-sm rounded p-4 ${className}`}>{children}</div>
}

export default Card
