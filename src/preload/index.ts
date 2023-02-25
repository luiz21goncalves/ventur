import { contextBridge, ipcRenderer } from 'electron'

import { IPC } from '@/shared/ipc'
import {
  FetchYearWithHolidaysFoundRequest,
  FetchYearWithHolidaysFoundResponse,
  SaveYearWithHolidaysFoundRequest,
} from '@/shared/types'

declare global {
  export interface Window {
    api: typeof api
  }
}

export const api = {
  fetchYearWithHolidays(
    params: FetchYearWithHolidaysFoundRequest,
  ): Promise<FetchYearWithHolidaysFoundResponse> {
    return ipcRenderer.invoke(IPC.YEARS_WITH_HOLIDAYS_FOUND.FETCH, params)
  },

  saveYearWithHolidays(
    params: SaveYearWithHolidaysFoundRequest,
  ): Promise<void> {
    return ipcRenderer.invoke(IPC.YEARS_WITH_HOLIDAYS_FOUND.SAVE, params)
  },
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
}
