import { HashRouter, Routes, Route } from 'react-router-dom';

import { Home } from '../screens/Home';
import { StudentCreate } from '../screens/Student/Create';
import { StudentList } from '../screens/Student/List';

export function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/create" element={<StudentCreate />} />
      </Routes>
    </HashRouter>
  );
}