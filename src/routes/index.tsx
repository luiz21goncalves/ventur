import { HashRouter, Routes, Route } from 'react-router-dom';

import { CreateAttendanceList } from '../screens/AttendanceList/Create';
import { Home } from '../screens/Home';
import { StudentCreate } from '../screens/Student/Create';
import { EditStudent } from '../screens/Student/Edit';
import { StudentList } from '../screens/Student/List';
import { ShowStudent } from '../screens/Student/Show';

export function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/create" element={<StudentCreate />} />
        <Route path="/students/:id" element={<ShowStudent />} />
        <Route path="/students/:id/edit" element={<EditStudent />} />
        <Route path="/attendance-list" element={<CreateAttendanceList />} />
      </Routes>
    </HashRouter>
  );
}
