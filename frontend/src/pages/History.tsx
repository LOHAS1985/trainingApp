import React, { useEffect, useState } from "react";
import { listRecords, deleteRecord, RecordItem, SetItem } from '../api/records'
import { searchExercises } from '../api/exercises'

export default function History(): JSX.Element {
  const [items, setItems] = useState<RecordItem[]>([])
  const [exMap, setExMap] = useState<Record<string,string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const [records, exercises] = await Promise.all([listRecords(), searchExercises()])
      setItems(records)
      const map: Record<string,string> = {}
      exercises.forEach((e: any) => (map[e.id] = e.name))
      setExMap(map)
    } catch (err: any) {
      setError(err.message || '失敗')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id: string) {
    if (!confirm('削除してもよいですか？')) return
    try {
      await deleteRecord(id)
      setItems((s) => s.filter((r) => r.id !== id))
    } catch (err) {
      alert('削除に失敗しました')
    }
  }

  function renderSet(s: SetItem) {
    if (s.type === 'reps') return `${s.reps}回${s.weight ? ` × ${s.weight}kg` : ''}`
    return `${s.timeSeconds}秒${s.weight ? ` × ${s.weight}kg` : ''}`
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-4">履歴</h2>
      <div className="p-6 bg-white/5 rounded-lg">
        {loading && <div>読み込み中...</div>}
        {error && <div className="text-red-400">{error}</div>}
        {!loading && items.length === 0 && <div>記録がありません。</div>}
        <ul className="space-y-3">
          {items.map((it) => (
            <li key={it.id} className="flex items-center justify-between bg-gray-800/40 p-3 rounded">
              <div>
                <div className="font-medium">{it.date} — {exMap[it.exerciseId] || it.exerciseId}</div>
                <div className="text-sm text-gray-300">{it.sets.map((s) => renderSet(s)).join(' | ')}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleDelete(it.id)} className="px-3 py-1 rounded bg-red-600">削除</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
