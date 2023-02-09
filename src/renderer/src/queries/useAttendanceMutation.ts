import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERIES } from '@/shared/queries'
import { Attendance } from '@/shared/types'

import { dexieAttendanceRepository } from '../repositories/implementations'

type createOrUpdateAttendanceParams = {
  date: string
  studentId: string
  presence: boolean
}

async function createOrUpdateAttendance(
  params: createOrUpdateAttendanceParams,
) {
  const { date, studentId, presence } = params

  let attendance = await dexieAttendanceRepository.findByDateAndStudentId({
    date,
    student_id: studentId,
  })

  if (attendance) {
    attendance = await dexieAttendanceRepository.save({
      date,
      id: attendance.id,
      presence,
      student_id: studentId,
    })

    return attendance
  }

  attendance = await dexieAttendanceRepository.create({
    date,
    presence,
    student_id: studentId,
  })

  return attendance
}

export function useAttendanceMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createOrUpdateAttendance,
    onSuccess(attendance, variables) {
      const { date, studentId } = variables

      queryClient.setQueryData<Attendance>(
        [QUERIES.ATTENDANCE.FETCH_DETAILS, date, studentId],
        () => {
          return attendance
        },
      )

      queryClient.invalidateQueries([
        QUERIES.ATTENDANCE.FETCH_ALL_PER_STUDENT,
        studentId,
        date,
      ])
    },
  })
}
