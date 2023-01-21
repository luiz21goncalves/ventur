import { Route, Router } from 'electron-router-dom'

import { Default } from './components/Layouts/Default'
import { CreateStudent } from './screens/CreateStudent'
import { Home } from './screens/Home'

export function Routes() {
  return (
    <Router
      main={
        <Route path="/" element={<Default />}>
          <Route path="/" element={<Home />} />
          <Route path="/student/create" element={<CreateStudent />} />
        </Route>
      }
    />
  )
}
