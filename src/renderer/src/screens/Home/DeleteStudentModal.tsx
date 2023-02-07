import { Divider, useDisclosure } from '@chakra-ui/react'
import { Fragment } from 'react'

import * as Modal from '../../components/Modal'
import { useStudentsQuery } from '../../queries/useStudentsQuery'
import { DeleteStudentForm } from './DeleteStudentForm'

export function DeleteStudentModal() {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const { data: students } = useStudentsQuery()

  return (
    <>
      <Modal.Trigger colorScheme="red" onClick={onOpen}>
        Remover alunos
      </Modal.Trigger>

      <Modal.Root isOpen={isOpen} onClose={onClose}>
        <Modal.Content>
          <Modal.Header>Remover alunos</Modal.Header>

          <Modal.Body mb="8" display="flex" flexDir="column" gap="2">
            {students?.map((student, index, original) => {
              const isNotLastItem = original.length > index + 1

              return (
                <Fragment key={student.id}>
                  <DeleteStudentForm student={student} />
                  {isNotLastItem && <Divider />}
                </Fragment>
              )
            })}
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  )
}
