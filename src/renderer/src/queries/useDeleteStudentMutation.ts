import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERIES } from '@/shared/queries'
import { Student } from '@/shared/types'

import { dexieStudentsRepository } from '../repositories/implementations'

type DeleteStudentParams = {
  studentId: string
}

async function deleteStudent(params: DeleteStudentParams) {
  const { studentId } = params

  await dexieStudentsRepository.delete(studentId)
}

export function useDeleteStudentMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteStudent,
    onSuccess(_, variables) {
      const { studentId } = variables

      queryClient.setQueryData<Student[]>(
        [QUERIES.STUDENTS.FETCH_ALL],
        (students) => {
          if (students && students.length > 0) {
            return students.filter((student) => student.id !== studentId)
          }

          return []
        },
      )
    },
  })
}
