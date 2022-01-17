const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('Main', {
  createStudent: (data) => ipcRenderer.invoke('create-student', data),
  updateStudent: (data) => ipcRenderer.invoke('update-student', data),
  getStudent: (id) => ipcRenderer.invoke('get-student', id),
  getAllStudents: () => ipcRenderer.invoke('get-all-students'),
  deleteStudent: (id) => ipcRenderer.invoke('delete-student', id),

  createOrUpdateAttendanceList: (data) => {
    ipcRenderer.send('create-attendance-list', data);
  },
  getAttendanceList: (date) => {
    const [year, month, day] = date.split('-');
    return ipcRenderer.invoke('get-attendance-list', { year, month, day });
  },
  getAllAttendanceListByMonth: ({ month }) =>
    ipcRenderer.invoke('get-all-attendance-list-by-month', { month }),

  getWorkingDay: ({ month }) =>
    ipcRenderer.invoke('get-working-days', { month }),
  createOrUpdateWorkingDays: (data) =>
    ipcRenderer.invoke('create-working-days', data),
});
