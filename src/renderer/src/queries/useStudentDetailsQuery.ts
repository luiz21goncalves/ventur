import { QueryFunctionContext, useQuery } from '@tanstack/react-query'

import { QUERIES } from '@/shared/queries'

import { dexieStudentsRepository } from '../repositories/implementations'

async function getStudentDetails(
  context: QueryFunctionContext<[string, string]>,
) {
  const [, studentId] = context.queryKey

  const student = await dexieStudentsRepository.findById(studentId)

  return student
}

type UseStudentDetailsQueryParams = {
  studentId: string
}

export function useStudentDetailsQuery(params: UseStudentDetailsQueryParams) {
  const { studentId } = params

  return useQuery({
    enabled: Boolean(studentId),
    queryFn: getStudentDetails,
    queryKey: [QUERIES.STUDENTS.FETCH_DETAILS, studentId],
  })
}
