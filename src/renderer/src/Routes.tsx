import { Route, Router } from 'electron-router-dom'

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
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<CalendarLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/holidays" element={<Holidays />} />
            <Route path="/attendance-list" element={<AttendanceList />} />
          </Route>

          <Route path="/student/:id" element={<StudentDetails />} />
          <Route path="/student/create" element={<CreateStudent />} />
        </Route>
      }
    />
  )
}
