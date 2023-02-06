import { Route, Router } from 'electron-router-dom'

import { ROUTES } from '@/shared/routes'

import { DefaultLayout } from './components/Layouts/DefaultLayout'
import { Home } from './screens/Home'

export function Routes() {
  return (
    <Router
      main={
        <Route path={ROUTES.HOME} element={<DefaultLayout />}>
          <Route path={ROUTES.HOME}>
            <Route path={ROUTES.HOME} element={<Home />} />
          </Route>
        </Route>
      }
    />
  )
}
