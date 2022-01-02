/* eslint-disable @typescript-eslint/ban-types */
import { contextBridge, ipcRenderer } from 'electron';

export const api = {
  createStudent: (data: unknown) => {
    ipcRenderer.send('create-student', data);
  },

  updateStudent: (data: unknown) => {
    ipcRenderer.send('update-student', data);
  },

  getStudent: (id: string) => {
    ipcRenderer.send('get-student', id);
  },

  getAllStudents: () => {
    ipcRenderer.send('get-all-students');
  },

  deleteStudent: (id: string) => {
    ipcRenderer.send('delete-student', id);
  },

  createAttendanceList: (data: unknown) => {
    ipcRenderer.send('create-attendance-list', data);
  },

  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },

  unsubscribe: (channel: string, callback: (...args: unknown[]) => void) => {
    ipcRenderer.removeListener(channel, callback);
  },
};

contextBridge.exposeInMainWorld('Main', api);
