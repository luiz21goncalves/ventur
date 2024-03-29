import { Divider } from '@chakra-ui/react'
import { Fragment } from 'react'

import { EmptyMessage } from '../../components/EmptyMessage'
import * as Modal from '../../components/Modal'
import { useStudentsQuery } from '../../queries/useStudentsQuery'
import { DeleteStudentForm } from './DeleteStudentForm'

export function DeleteStudentModal() {
  const { data: students } = useStudentsQuery()

  const isEmptyList = students?.length === 0

  return (
    <Modal.Root>
      <Modal.Trigger colorScheme="red">Remover alunos</Modal.Trigger>

      <Modal.Content>
        <Modal.Header>Remover alunos</Modal.Header>

        <Modal.Body mb="8" display="flex" flexDir="column" gap="2">
          {isEmptyList ? (
            <EmptyMessage>Não há alunos.</EmptyMessage>
          ) : (
            students?.map((student, index, original) => {
              const isNotLastItem = original.length > index + 1

              return (
                <Fragment key={student.id}>
                  <DeleteStudentForm student={student} />
                  {isNotLastItem && <Divider />}
                </Fragment>
              )
            })
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
