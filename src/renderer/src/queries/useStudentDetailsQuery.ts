import { QueryFunctionContext, useQuery } from '@tanstack/react-query'

import { QUERIES } from '@/shared/queries'

import { db } from '../lib/dexie'

async function getStudentDetails(
  context: QueryFunctionContext<[string, number]>,
) {
  const [, studentId] = context.queryKey

  const result = await db.students.where('id').equals(studentId).toArray()

  const student = result[0]

  return student
}

type UseStudentDetailsQueryParams = {
  studentId: number
}

export function useStudentDetailsQuery(params: UseStudentDetailsQueryParams) {
  const { studentId } = params

  return useQuery({
    enabled: Boolean(studentId),
    queryFn: getStudentDetails,
    queryKey: [QUERIES.STUDENTS.FETCH_DETAILS, Number(studentId)],
  })
}
