import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { QUERIES } from '@/shared/queries'
import { Holiday } from '@/shared/types'

import { dexieHolidaysRepository } from '../repositories/implementations'

type DeleteHolidayParams = {
  holidayId: string
  date: string
}

async function deleteHoliday(params: DeleteHolidayParams) {
  const { holidayId } = params

  await dexieHolidaysRepository.delete(holidayId)
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
