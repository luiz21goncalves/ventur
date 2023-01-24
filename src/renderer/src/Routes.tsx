import { Route, Router } from 'electron-router-dom'

import { Default } from './components/Layouts/Default'
import { AttendanceList } from './screens/AttendanceList'
import { CreateStudent } from './screens/CreateStudent'
import { Home } from './screens/Home'
import { StudentDetails } from './screens/StudentDetails'

export function Routes() {
  return (
    <Router
      main={
        <Route path="/" element={<Default />}>
          <Route path="/" element={<Home />} />
          <Route path="/student/create" element={<CreateStudent />} />
          <Route path="/student/:id" element={<StudentDetails />} />
          <Route path="/attendance-list" element={<AttendanceList />} />
        </Route>
      }
    />
  )
}
