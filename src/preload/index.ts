import { contextBridge } from 'electron'

declare global {
  export interface Window {
    api: typeof api
  }
}

export const api = {}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
}
