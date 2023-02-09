import * as Modal from '../../components/Modal'
import { NewHolidayModalContent } from './NewHolidayModalContent'

export function NewHolidayModal() {
  return (
    <Modal.Root>
      <Modal.Trigger>Novo feriado</Modal.Trigger>

      <NewHolidayModalContent />
    </Modal.Root>
  )
}
