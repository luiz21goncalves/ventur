import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { QUERIES } from '@/shared/queries'

import { dexieAttendanceRepository } from '../repositories/implementations'
import { useCalendarSelectedDate } from '../stores/useCalendarSelectedDate'

type UseAttendanceQueryProps = {
  studentId: string
}

async function getAttendance(
  context: QueryFunctionContext<[string, string, string]>,
) {
  const [, date, studentId] = context.queryKey

  const attendance = await dexieAttendanceRepository.findByDateAndStudentId({
    date,
    student_id: studentId,
  })

  return attendance ?? null
}

export function useAttendanceQuery({ studentId }: UseAttendanceQueryProps) {
  const [selectedDate] = useCalendarSelectedDate()

  const date = dayjs(selectedDate).startOf('date').toISOString()

  return useQuery({
    enabled: Boolean(studentId),
    queryFn: getAttendance,
    queryKey: [QUERIES.ATTENDANCE.FETCH_DETAILS, date, studentId],
  })
}
