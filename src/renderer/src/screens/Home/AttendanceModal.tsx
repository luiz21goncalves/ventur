import { Student } from '@/shared/types'

import * as Modal from '../../components/Modal'
import { AttendanceModalContent } from './AttendanceModalContent'

type AttendanceModalProps = {
  student: Student
}

export function AttendanceModal(props: AttendanceModalProps) {
  const { student } = props

  return (
    <Modal.Root>
      <Modal.Trigger variant="ghost" colorScheme="gray">
        Presença
      </Modal.Trigger>

      <AttendanceModalContent student={student} />
    </Modal.Root>
  )
}
