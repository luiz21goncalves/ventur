import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERIES } from '@/shared/queries'
import { Student } from '@/shared/types'

import { db } from '../lib/dexie'

type CreateStudentParams = Pick<
  Student,
  'birthdate' | 'name' | 'price_per_month_in_cents' | 'weekdays'
>

async function createStudent(
  params: CreateStudentParams,
): Promise<{ id: number }> {
  const {
    name,
    price_per_month_in_cents: pricePerMonthInCents,
    weekdays,
    birthdate,
  } = params

  const id = await db.students.add({
    birthdate,
    classes_per_week: weekdays.length,
    name,
    price_per_month_in_cents: pricePerMonthInCents,
    weekdays,
  })

  return { id: Number(id) }
}

export function useCrateStudentMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createStudent,
    onSuccess() {
      queryClient.invalidateQueries([QUERIES.STUDENTS.FETCH_ALL])
    },
  })
}
