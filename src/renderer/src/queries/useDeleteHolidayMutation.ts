import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { QUERIES } from '@/shared/queries'
import { Holiday } from '@/shared/types'

import { db } from '../lib/dexie'

type DeleteHolidayParams = {
  holidayId: number
  date: string
}

async function deleteHoliday(params: DeleteHolidayParams) {
  const { holidayId } = params

  await db.holidays.delete(holidayId)
}

export function useDeleteHolidayMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteHoliday,
    onSuccess(_, variables) {
      const { date, holidayId } = variables

      const year = dayjs(date).get('year')

      queryClient.setQueryData<Holiday[]>(
        [QUERIES.HOLIDAYS.FETCH_ALL, year],
        (holidays) => {
          if (holidays && holidays.length > 0) {
            return holidays.filter((holiday) => holiday.id !== holidayId)
          }

          return []
        },
      )
    },
  })
}
