import * as Modal from '../../components/Modal'
import { NewStudentModalContent } from './NewStudentModalContent'

export function NewStudentModal() {
  return (
    <Modal.Root>
      <Modal.Trigger>Novo aluno</Modal.Trigger>

      <NewStudentModalContent />
    </Modal.Root>
  )
}
