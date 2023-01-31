import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { QUERIES } from '@/shared/queries'
import { Holiday } from '@/shared/types'

import { db } from '../lib/dexie'

type HolidayData = Pick<Holiday, 'name' | 'date'>
type HolidayResponse = Required<Holiday>

async function createHoliday(data: HolidayData): Promise<HolidayResponse> {
  const { date, name } = data

  const id = await db.holidays.add({
    date,
    name,
  })

  return { date, id: Number(id), name }
}

export function useCreteHolidayMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createHoliday,
    onSuccess(data) {
      const year = dayjs(data.date).get('year')

      queryClient.setQueryData<Holiday[]>(
        [QUERIES.HOLIDAYS.FETCH_ALL, year],
        (holidays) => {
          if (holidays && holidays.length > 0) {
            return [...holidays, data]
          }

          return [data]
        },
      )
    },
  })
}
