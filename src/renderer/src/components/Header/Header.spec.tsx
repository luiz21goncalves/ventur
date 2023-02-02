import { ChakraProvider } from '@chakra-ui/react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it } from 'vitest'

import { ROUTES } from '@/shared/routes'

import { Header } from './index'

describe('Header', () => {
  it('should be able to render navigation links', () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ChakraProvider>,
    )

    const navLinkList = screen.queryAllByRole('link')

    const homeLink = navLinkList[0]
    const attendanceListLink = navLinkList[1]
    const createStudentLink = navLinkList[2]
    const holidaysLink = navLinkList[3]

    expect(navLinkList).toHaveLength(4)

    expect(homeLink).toHaveAttribute('href', ROUTES.HOME)
    expect(attendanceListLink).toHaveAttribute('href', ROUTES.ATTENDANCE_LIST)
    expect(createStudentLink).toHaveAttribute('href', ROUTES.STUDENTS.CREATE)
    expect(holidaysLink).toHaveAttribute('href', ROUTES.HOLIDAYS)
  })
})
