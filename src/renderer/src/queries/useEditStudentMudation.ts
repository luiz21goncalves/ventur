import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERIES } from '@/shared/queries'
import { Student } from '@/shared/types'

import { dexieStudentsRepository } from '../repositories/implementations'
type EditStudentParams = Pick<
  Student,
  'id' | 'birthdate' | 'name' | 'price_per_month_in_cents' | 'weekdays'
>

async function editStudent(params: EditStudentParams) {
  const {
    id,
    name,
    price_per_month_in_cents: pricePerMonthInCents,
    weekdays,
    birthdate,
  } = params

  const student = await dexieStudentsRepository.save({
    birthdate,
    classes_per_week: weekdays.length,
    id,
    name,
    price_per_month_in_cents: pricePerMonthInCents,
    weekdays,
  })

  return student
}

export function useEditStudentMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editStudent,
    onSuccess(student) {
      queryClient.setQueryData<Student[]>(
        [QUERIES.STUDENTS.FETCH_ALL],
        (students) => {
          if (students && students.length > 0) {
            const updatedStudents = students.map((findStudent) => {
              if (findStudent.id === student.id) {
                return student
              }

              return findStudent
            })

            return updatedStudents
          }
        },
      )

      queryClient.invalidateQueries([QUERIES.STUDENTS.FETCH_DETAILS])
    },
  })
}
