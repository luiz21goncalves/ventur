import { useQuery } from '@tanstack/react-query'

import { QUERIES } from '@/shared/queries'
import { Student } from '@/shared/types'

import { db } from '../lib/dexie'

async function getStudents(): Promise<Student[]> {
  const students = await db.students.toArray()

  return students
}

export function useStudentsQuery() {
  return useQuery({
    queryFn: getStudents,
    queryKey: [QUERIES.STUDENTS.FETCH_ALL],
  })
}
