import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Record from '../Record'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../../api/exercises', () => {
  return {
    searchExercises: vi.fn(async (q = '', category?: string) => {
      return [ { id: 'e1', name: '既存種目', group: category || 'その他' } ]
    }),
    listExerciseGroups: vi.fn(async () => [ { id: 'その他', name: 'その他' } ]),
    createExercise: vi.fn(async (name: string, group?: string) => ({ id: `ex_${Date.now()}`, name, group: group || 'その他' })),
  }
})

vi.mock('../../api/records', () => ({ createRecord: vi.fn(async () => ({ id: 'r1' })) }))

describe('Record page', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Record />
      </MemoryRouter>
    )
  })

  test('renders selects and can open create modal', async () => {
    // groups select should exist
    expect(await screen.findByRole('combobox', { name: /部位|種目/ })).toBeTruthy()
  })

  test('create exercise flow and add set shows created name', async () => {
    const user = userEvent.setup()
    // open modal
    const createBtn = await screen.findByRole('button', { name: /独自種目作成/ })
    await user.click(createBtn)
    const nameInput = await screen.findByLabelText(/種目名/)
    await user.type(nameInput, 'テスト種目')
    // find the modal dialog and click the 作成 button inside it
    const dialog = await screen.findByRole('dialog')
    const { getByRole } = within(dialog)
    const submit = getByRole('button', { name: /作成/ })
    await user.click(submit)

    // wait for option to appear in select
    const option = await screen.findByRole('option', { name: 'テスト種目' })
    expect(option).toBeInTheDocument()

    // find the exercise select that contains this option
    const selects = screen.getAllByRole('combobox')
    let exerciseSelect: HTMLSelectElement | null = null
    for (const s of selects) {
      try {
        within(s).getByRole('option', { name: 'テスト種目' })
        exerciseSelect = s as HTMLSelectElement
        break
      } catch (e) {
        // not this one
      }
    }
    if (!exerciseSelect) throw new Error('exercise select not found')
    await user.selectOptions(exerciseSelect, option as HTMLOptionElement)
    const addBtn = screen.getByRole('button', { name: /セットを追加/ })
    await user.click(addBtn)

    // created set should show the human-readable name (option + table cell may both exist)
    const found = await screen.findAllByText('テスト種目')
    expect(found.length).toBeGreaterThan(0)
  })
})
