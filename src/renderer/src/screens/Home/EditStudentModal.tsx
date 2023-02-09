import { Student } from '@/shared/types'

import * as Modal from '../../components/Modal'
import { EditStudentModalContent } from './EditStudentModalContent'

type EditStudentModalProps = {
  student: Student
}

export function EditStudentModal(props: EditStudentModalProps) {
  const { student } = props

  return (
    <Modal.Root>
      <Modal.Trigger variant="ghost" colorScheme="gray">
        Editar
      </Modal.Trigger>

      <EditStudentModalContent student={student} />
    </Modal.Root>
  )
}
