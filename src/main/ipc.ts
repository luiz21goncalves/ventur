import { ipcMain } from 'electron'

import { IPC } from '@/shared/ipc'
import {
  FetchYearWithHolidaysFoundRequest,
  FetchYearWithHolidaysFoundResponse,
  SaveYearWithHolidaysFoundRequest,
} from '@/shared/types'

import { store } from './store'

ipcMain.handle(
  IPC.YEARS_WITH_HOLIDAYS_FOUND.FETCH,
  async (
    _,
    params: FetchYearWithHolidaysFoundRequest,
  ): Promise<FetchYearWithHolidaysFoundResponse> => {
    const { year } = params

    const years = store.get('yearsWithHolidaysFound')

    const isIncluded = years.includes(year)

    return { data: isIncluded }
  },
)

ipcMain.handle(
  IPC.YEARS_WITH_HOLIDAYS_FOUND.SAVE,
  async (_, params: SaveYearWithHolidaysFoundRequest): Promise<void> => {
    const { year } = params

    const years = store.get('yearsWithHolidaysFound')

    const isIncluded = years.includes(year)

    if (!isIncluded) {
      store.set('yearsWithHolidaysFound', [...years, year])
    }
  },
)
