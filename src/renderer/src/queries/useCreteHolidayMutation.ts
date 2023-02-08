import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { QUERIES } from '@/shared/queries'
import { Holiday } from '@/shared/types'

import { dexieHolidaysRepository } from '../repositories/implementations'

type HolidayData = Pick<Holiday, 'name' | 'date'>
type HolidayResponse = Required<Holiday>

async function createHoliday(data: HolidayData): Promise<HolidayResponse> {
  const { date, name } = data

  const holiday = await dexieHolidaysRepository.create({
    date,
    name,
  })

  return holiday
}

export function useCreteHolidayMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createHoliday,
    onSuccess(holiday) {
      const year = dayjs(holiday.date).get('year')

      queryClient.setQueryData<Holiday[]>(
        [QUERIES.HOLIDAYS.FETCH_ALL, year],
        (holidays) => {
          if (holidays && holidays.length > 0) {
            return [...holidays, holiday]
          }

          return [holiday]
        },
      )
    },
  })
}
