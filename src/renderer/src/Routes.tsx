import { Route, Router } from 'electron-router-dom'

import { ROUTES } from '@/shared/routes'

import { CalendarLayout } from './components/Layouts/CalendarLayout'
import { DefaultLayout } from './components/Layouts/DefaultLayout'
import { AttendanceList } from './screens/AttendanceList'
import { CreateStudent } from './screens/CreateStudent'
import { Holidays } from './screens/Holidays'
import { Home } from './screens/Home'
import { StudentDetails } from './screens/StudentDetails'

export function Routes() {
  return (
    <Router
      main={
        <Route path={ROUTES.HOME} element={<DefaultLayout />}>
          <Route path={ROUTES.HOME} element={<CalendarLayout />}>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.HOLIDAYS} element={<Holidays />} />
            <Route path={ROUTES.ATTENDANCE_LIST} element={<AttendanceList />} />
            <Route
              path={ROUTES.STUDENTS.DETAILS}
              element={<StudentDetails />}
            />
          </Route>

          <Route path={ROUTES.STUDENTS.CREATE} element={<CreateStudent />} />
        </Route>
      }
    />
  )
}
