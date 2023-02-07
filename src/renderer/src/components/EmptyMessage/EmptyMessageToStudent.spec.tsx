import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'

import { EmptyMessage } from '.'

describe('EmptyMessage', () => {
  it('should be able to render a primary message', () => {
    render(<EmptyMessage>Não há nenhum aluno</EmptyMessage>)

    const primaryMessage = screen.getByText(/não há nenhum aluno/i)

    expect(primaryMessage).toBeInTheDocument()
  })
})
