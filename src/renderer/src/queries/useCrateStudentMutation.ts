import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERIES } from '@/shared/queries'
import { Student } from '@/shared/types'

import { dexieStudentsRepository } from '../repositories/implementations'

type CreateStudentParams = Pick<
  Student,
  'birthdate' | 'name' | 'price_per_month_in_cents' | 'weekdays'
>

async function createStudent(params: CreateStudentParams) {
  const {
    name,
    price_per_month_in_cents: pricePerMonthInCents,
    weekdays,
    birthdate,
  } = params

  const student = dexieStudentsRepository.create({
    birthdate,
    classes_per_week: weekdays.length,
    name,
    price_per_month_in_cents: pricePerMonthInCents,
    weekdays,
  })

  return student
}

export function useCrateStudentMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createStudent,
    onSuccess(student) {
      queryClient.setQueryData<Student[]>(
        [QUERIES.STUDENTS.FETCH_ALL],
        (students) => {
          if (students && students.length > 0) {
            return [...students, student]
          }

          return [student]
        },
      )
    },
  })
}
