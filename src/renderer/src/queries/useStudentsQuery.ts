import { useQuery } from '@tanstack/react-query'

import { QUERIES } from '@/shared/queries'
import { Student } from '@/shared/types'

import { dexieStudentsRepository } from '../repositories/implementations'

async function getStudents(): Promise<Student[]> {
  const students = await dexieStudentsRepository.findAll()

  return students
}

export function useStudentsQuery() {
  return useQuery({
    queryFn: getStudents,
    queryKey: [QUERIES.STUDENTS.FETCH_ALL],
  })
}
