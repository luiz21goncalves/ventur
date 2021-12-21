import { HashRouter, Routes, Route } from 'react-router-dom';

import { Home } from '../screens/Home';

export function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}
