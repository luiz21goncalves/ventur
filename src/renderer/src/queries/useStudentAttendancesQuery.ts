import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { QUERIES } from '@/shared/queries'

import { dexieAttendanceRepository } from '../repositories/implementations'
import { useCalendarSelectedDate } from '../stores/useCalendarSelectedDate'

type UseStudentAttendancesQueryProps = { studentId: string }

async function getAllAttendancesPerStudent(
  context: QueryFunctionContext<[string, string, string]>,
) {
  const [, studentId, date] = context.queryKey

  const attendances = await dexieAttendanceRepository.findByStudentIdAndMonth({
    date,
    student_id: studentId,
  })

  return attendances
}

export function useStudentAttendancesQuery({
  studentId,
}: UseStudentAttendancesQueryProps) {
  const [selectedDate] = useCalendarSelectedDate()

  const date = dayjs(selectedDate).startOf('date').toISOString()

  return useQuery({
    queryFn: getAllAttendancesPerStudent,
    queryKey: [QUERIES.ATTENDANCE.FETCH_ALL_PER_STUDENT, studentId, date],
  })
}
