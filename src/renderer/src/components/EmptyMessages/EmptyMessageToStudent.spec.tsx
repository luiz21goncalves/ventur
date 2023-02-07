import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'

import { EmptyMessageToStudent } from './EmptyMessageToStudent'

describe('EmptyMessageToStudent', () => {
  it('should be able to render a primary message', () => {
    render(<EmptyMessageToStudent />)

    const primaryMessage = screen.getByText(/não há nenhum aluno/i)

    expect(primaryMessage).toBeInTheDocument()
  })
})
