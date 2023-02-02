import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it } from 'vitest'

import { EmptyMessageToStudent } from './EmptyMessageToStudent'

describe('EmptyMessageToStudent', () => {
  it('should be able to render a primary message', () => {
    render(<EmptyMessageToStudent />)

    const primaryMessage = screen.getByText(/não há nenhum aluno/i)

    expect(primaryMessage).toBeInTheDocument()
  })

  it('should be able to render a secondary message', () => {
    render(
      <BrowserRouter>
        <EmptyMessageToStudent hasLink />
      </BrowserRouter>,
    )

    const secondaryMessage = screen.getByText(/e adicione seu primeiro aluno/i)

    expect(secondaryMessage).toBeInTheDocument()
  })

  it('should be able to render a link with the route `/student/create`', async () => {
    render(
      <BrowserRouter>
        <EmptyMessageToStudent hasLink />
      </BrowserRouter>,
    )

    const link = screen.getByRole('link', { name: /clique aqui/i })

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/student/create')
  })
})
