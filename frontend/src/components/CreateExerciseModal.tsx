import React, { useState } from 'react'
import { createExercise } from '../api/exercises'

type Props = {
  isOpen: boolean
  onClose: () => void
  onCreated: (ex: { id: string; name: string; group?: string }) => void
}

export default function CreateExerciseModal({ isOpen, onClose, onCreated }: Props) {
  const [name, setName] = useState('')
  const [group, setGroup] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  async function handleCreate() {
    if (!name.trim()) return setError('名前を入力してください')
    setError(null)
    setLoading(true)
    try {
      const ex = await createExercise(name.trim(), group.trim() || undefined)
      onCreated(ex)
      setName('')
      setGroup('')
      onClose()
    } catch (e: any) {
      setError(e?.message || '作成に失敗しました')
    } finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="bg-white rounded shadow-lg w-full max-w-md mx-4">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="text-lg font-medium">独自種目を作成</div>
          <button onClick={onClose} className="text-sm text-gray-600">閉じる</button>
        </div>
        <div className="p-4">
          <label className="block mb-3">
            <div className="text-sm text-gray-600 mb-1">種目名</div>
            <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full rounded px-3 py-2 border bg-white text-gray-900" />
          </label>
          <label className="block mb-3">
            <div className="text-sm text-gray-600 mb-1">部位（任意）</div>
            <input value={group} onChange={(e)=>setGroup(e.target.value)} className="w-full rounded px-3 py-2 border bg-white text-gray-900" />
          </label>
          {error && <div className="text-sm text-red-500 mb-2">{error}</div>}
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-3 py-1 rounded bg-gray-200">キャンセル</button>
            <button onClick={handleCreate} disabled={loading} className="px-3 py-1 rounded bg-blue-600 text-white">{loading ? '作成中...' : '作成'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
