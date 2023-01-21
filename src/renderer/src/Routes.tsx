import { Route, Router } from 'electron-router-dom'

import { CreateStudent } from './screens/CreateStudent'
import { Home } from './screens/Home'

export function Routes() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<Home />} />
          <Route path="/student/create" element={<CreateStudent />} />
        </>
      }
    />
  )
}
