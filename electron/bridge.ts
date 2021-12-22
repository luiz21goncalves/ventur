/* eslint-disable @typescript-eslint/ban-types */
import { contextBridge, ipcRenderer } from 'electron';

export const api = {
  createStudent: (data: unknown) => {
    ipcRenderer.send('create-student', data);
  },

  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
};

contextBridge.exposeInMainWorld('Main', api);
