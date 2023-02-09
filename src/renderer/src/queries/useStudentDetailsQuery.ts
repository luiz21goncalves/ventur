import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { QUERIES } from '@/shared/queries'

import {
  dexieAttendanceRepository,
  dexieHolidaysRepository,
  dexieStudentsRepository,
} from '../repositories/implementations'
import { useCalendarSelectedDate } from '../stores/useCalendarSelectedDate'
import { calculateMonthlyPayment } from '../utils/calculate-monthly-payment'

async function getStudentDetails(
  context: QueryFunctionContext<[string, string, string]>,
) {
  const [, studentId, date] = context.queryKey

  const year = dayjs(date).get('year')

  const student = await dexieStudentsRepository.findById(studentId)
  const attendances = await dexieAttendanceRepository.findByStudentIdAndMonth({
    date,
    student_id: studentId,
  })
  const holidays = await dexieHolidaysRepository.findByYear(year)
  const formattedHolidays = holidays.map((holiday) => holiday.date)

  const classDays = attendances.map((attendance) => attendance.date)

  const priceToPayInCents = calculateMonthlyPayment({
    classDays,
    holidays: formattedHolidays,
    pricePerMonthInCents: student?.price_per_month_in_cents ?? 0,
    referenceDate: dayjs(date).toDate(),
    weekdays: student?.weekdays ?? [],
  })

  return { ...student, priceToPayInCents }
}

type UseStudentDetailsQueryParams = {
  studentId: string
}

export function useStudentDetailsQuery(params: UseStudentDetailsQueryParams) {
  const { studentId } = params

  const [selectedDate] = useCalendarSelectedDate()

  const date = dayjs(selectedDate).startOf('date').toISOString()

  return useQuery({
    enabled: Boolean(studentId),
    queryFn: getStudentDetails,
    queryKey: [QUERIES.STUDENTS.FETCH_DETAILS, studentId, date],
  })
}
