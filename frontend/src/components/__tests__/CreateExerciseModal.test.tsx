import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateExerciseModal from '../CreateExerciseModal'

vi.mock('../../api/exercises', () => ({ createExercise: vi.fn(async (n: string) => ({ id: `ex_${Date.now()}`, name: n })) }))

describe('CreateExerciseModal', () => {
  test('opens and calls createExercise', async () => {
    const onClose = vi.fn()
    const onCreated = vi.fn()
    render(<CreateExerciseModal isOpen={true} onClose={onClose} onCreated={onCreated} />)
    const user = userEvent.setup()
    const nameInput = screen.getByLabelText(/種目名/)
    await user.type(nameInput, 'モック種目')
    await user.click(screen.getByRole('button', { name: /作成/ }))
    expect(onCreated).toHaveBeenCalled()
  })
})
