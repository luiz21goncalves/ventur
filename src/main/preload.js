const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('Main', {
  createStudent: (data) => ipcRenderer.invoke('create-student', data),
  updateStudent: (data) => ipcRenderer.invoke('update-student', data),
  getStudent: (data) => ipcRenderer.invoke('find-student', data),
  getAllStudents: () => ipcRenderer.invoke('find-students'),
  deleteStudent: (data) => ipcRenderer.invoke('delete-student', data),

  createOrUpdateAttendanceList: (data) =>
    ipcRenderer.invoke('create-attendance-list', data),

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
