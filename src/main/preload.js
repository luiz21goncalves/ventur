const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('Main', {
  createStudent: (data) => ipcRenderer.invoke('create-student', data),

  updateStudent: (data) => {
    ipcRenderer.send('update-student', data);
  },

  getStudent: (id) => {
    ipcRenderer.send('get-student', id);
  },

  getAllStudents: () => {
    ipcRenderer.send('get-all-students');
  },

  deleteStudent: (id) => {
    ipcRenderer.send('delete-student', id);
  },

  createOrUpdateAttendanceList: (data) => {
    ipcRenderer.send('create-attendance-list', data);
  },

  getAttendanceList: (date) => {
    const [year, month, day] = date.split('-');
    ipcRenderer.send('get-attendance-list', { year, month, day });
  },

  getAllAttendanceListByMonth: ({ month }) => {
    ipcRenderer.send('get-all-attendance-list-by-month', { month });
  },

  getWorkingDay: ({ month }) => {
    ipcRenderer.send('get-working-days', { month });
  },

  createOrUpdateWorkingDays: (data) => {
    ipcRenderer.send('create-working-days', data);
  },

  on: (channel, callback) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },

  unsubscribe: (channel, callback) => {
    ipcRenderer.removeListener(channel, callback);
  },
});
