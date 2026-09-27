export type SetItem = {
  exerciseId?: string
  exerciseName?: string
  exerciseGroup?: string
  type: 'reps' | 'time'
  reps?: number
  timeSeconds?: number
  weight?: number
}

export type RecordItem = {
  id: string
  date: string
  exerciseId: string
  sets: SetItem[]
}

export async function listRecords(): Promise<RecordItem[]> {
  const res = await fetch('/api/records')
  if (!res.ok) throw new Error('Failed to fetch records')
  return res.json()
}

export async function getRecord(id: string): Promise<RecordItem> {
  const res = await fetch(`/api/records/${id}`)
  if (!res.ok) throw new Error('Not found')
  return res.json()
}

export async function createRecord(body: Omit<RecordItem, 'id'>): Promise<RecordItem> {
  const res = await fetch('/api/records', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('Failed to create')
  return res.json()
}

export async function deleteRecord(id: string): Promise<void> {
  const res = await fetch(`/api/records/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete')
}
