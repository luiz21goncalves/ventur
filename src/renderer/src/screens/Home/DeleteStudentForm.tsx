import { Button, HStack, Text, useToast } from '@chakra-ui/react'

import { Student } from '@/shared/types'

import { useDeleteStudentMutation } from '../../queries/useDeleteStudentMutation'

type DeleteStudentFormProps = {
  student: Student
}

export function DeleteStudentForm(props: DeleteStudentFormProps) {
  const { student } = props

  const toast = useToast()
  const { mutate, isLoading } = useDeleteStudentMutation()

  function handleDeleteHoloday() {
    mutate(
      {
        studentId: student.id!,
      },
      {
        onSuccess() {
          toast({
            position: 'top-right',
            status: 'info',
            title: `Aluno ${student.name} apagado`,
          })
        },
      },
    )
  }

  return (
    <HStack w="full" justify="space-between">
      <Text>{student.name}</Text>

      <Button
        variant="ghost"
        colorScheme="red"
        onClick={handleDeleteHoloday}
        disabled={isLoading}
      >
        Apagar
      </Button>
    </HStack>
  )
}
