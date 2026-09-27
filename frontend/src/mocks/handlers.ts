import { rest } from 'msw'

const sampleExercises = [
  { id: 'ex1', name: 'Bench Press' },
  { id: 'ex2', name: 'Squat' },
  { id: 'ex3', name: 'Deadlift' },
]

let records = [
  {
    id: 'r1',
    date: '2026-09-26',
    exerciseId: 'ex1',
    sets: [{ reps: 8, weight: 60 }],
  },
]

export const handlers = [
  // List records
  rest.get('/api/records', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(records))
  }),

  // Create record
  rest.post('/api/records', async (req, res, ctx) => {
    const body = await req.json()
    const newRec = { id: `r${Date.now()}`, ...body }
    records.push(newRec)
    return res(ctx.status(201), ctx.json(newRec))
  }),

  // Get / Update / Delete by id
  rest.get('/api/records/:id', (req, res, ctx) => {
    const { id } = req.params as { id: string }
    const rec = records.find((r) => r.id === id)
    if (!rec) return res(ctx.status(404))
    return res(ctx.status(200), ctx.json(rec))
  }),

  rest.put('/api/records/:id', async (req, res, ctx) => {
    const { id } = req.params as { id: string }
    const body = await req.json()
    const idx = records.findIndex((r) => r.id === id)
    if (idx === -1) return res(ctx.status(404))
    records[idx] = { ...records[idx], ...body }
    return res(ctx.status(200), ctx.json(records[idx]))
  }),

  rest.delete('/api/records/:id', (req, res, ctx) => {
    const { id } = req.params as { id: string }
    records = records.filter((r) => r.id !== id)
    return res(ctx.status(204))
  }),

  // Exercise search
  rest.get('/api/exercises', (req, res, ctx) => {
    const q = req.url.searchParams.get('q') || ''
    const result = sampleExercises.filter((e) => e.name.toLowerCase().includes(q.toLowerCase()))
    return res(ctx.status(200), ctx.json(result))
  }),
]

export default handlers
