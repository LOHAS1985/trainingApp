import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(): JSX.Element {
  const today = new Date().toISOString().slice(0,10)
  return (
    <header className="w-full bg-gray-800 text-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold">TrainingApp</Link>
          <nav className="hidden sm:flex gap-3 text-sm">
            <Link to="/record" className="hover:underline">記録</Link>
            <Link to="/history" className="hover:underline">履歴</Link>
            <Link to="/menu" className="hover:underline">メニュー</Link>
            <Link to="/body" className="hover:underline">身体</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-300">{today}</div>
          <Link to="/account" className="px-3 py-1 bg-gray-700 rounded text-sm">アカウント</Link>
        </div>
      </div>
    </header>
  )
}
