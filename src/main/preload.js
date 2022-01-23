const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('Main', {
  createStudent: (data) => ipcRenderer.invoke('create-student', data),
  updateStudent: (data) => ipcRenderer.invoke('update-student', data),
  getStudent: (data) => ipcRenderer.invoke('find-student', data),
  getAllStudents: () => ipcRenderer.invoke('find-students'),
  deleteStudent: (data) => ipcRenderer.invoke('delete-student', data),

  createOrUpdateAttendanceList: (data) =>
    ipcRenderer.invoke('create-attendance-list', data),
  getAttendanceList: (data) => ipcRenderer.invoke('find-attendance-list', data),
  getAllAttendanceListByMonth: (data) =>
    ipcRenderer.invoke('find-attendance-list-by-month', data),

  getWorkingDayByMonth: (data) =>
    ipcRenderer.invoke('find-working-days-by-month', data),
  createOrUpdateWorkingDays: (data) =>
    ipcRenderer.invoke('create-working-days', data),
});
