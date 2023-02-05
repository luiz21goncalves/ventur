import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { QUERIES } from '@/shared/queries'

import { db } from '../lib/dexie'

async function getStudentDetails(
  context: QueryFunctionContext<[string, number]>,
) {
  const [, id] = context.queryKey

  const result = await db.students.where('id').equals(id).toArray()

  const student = result[0]

  return student
}

export function useStudentDetailsQuery() {
  const { id } = useParams()

  return useQuery({
    enabled: Boolean(id),
    queryFn: getStudentDetails,
    queryKey: [QUERIES.STUDENTS.FETCH_DETAILS, Number(id)],
  })
}
