import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

type User = { username: string; password?: string }

function loadUsers(): User[] {
  try {
    const raw = localStorage.getItem('trainingapp:users')
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function saveUsers(users: User[]) { localStorage.setItem('trainingapp:users', JSON.stringify(users)) }

function setAuthUser(u: { username: string } | null) {
  if (u) localStorage.setItem('trainingapp:authUser', JSON.stringify(u))
  else localStorage.removeItem('trainingapp:authUser')
}

export default function Account(): JSX.Element {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [current, setCurrent] = useState<{username:string}|null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('trainingapp:authUser')
      if (raw) setCurrent(JSON.parse(raw))
    } catch {}
  }, [])

  function register() {
    if (!username) return alert('ユーザ名を入力してください')
    const users = loadUsers()
    users.push({ username, password })
    saveUsers(users)
    alert('登録しました')
    // auto-login after register
    setAuthUser({ username })
    setCurrent({ username })
    navigate('/')
  }

  function login() {
    if (!username) return alert('ユーザ名を入力してください')
    // per request: accept any username/password — still store authUser
    const users = loadUsers()
    const found = users.find(u => u.username === username)
    setAuthUser({ username })
    setCurrent({ username })
    alert('ログインしました')
    navigate('/')
  }

  // displayName functionality removed per request

  function logout() {
    setAuthUser(null)
    setCurrent(null)
    navigate('/')
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-4">アカウント</h2>
      <div className="p-6 bg-white/5 rounded-lg max-w-md">
        {!current && (
          <>
            <div className="mb-3"><label className="block text-sm">ユーザ名</label>
              <input value={username} onChange={e => setUsername(e.target.value)} className="w-full px-3 py-2 rounded bg-gray-800/60" /></div>
            <div className="mb-3"><label className="block text-sm">パスワード</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 rounded bg-gray-800/60" /></div>
            <div className="flex gap-2">
              <button onClick={register} className="px-3 py-2 rounded bg-green-600">登録</button>
              <button onClick={login} className="px-3 py-2 rounded bg-blue-600">ログイン</button>
            </div>
          </>
        )}

        {current && (
          <>
            <div className="mb-3">ログイン中: <strong>{current.username}</strong></div>
            <div className="flex gap-2">
              <button onClick={logout} className="px-3 py-2 rounded bg-red-600">ログアウト</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
