import { Divider } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { Fragment, useMemo } from 'react'

import { EmptyMessage } from '../../components/EmptyMessage'
import * as Modal from '../../components/Modal'
import { useHolidaysQuery } from '../../queries/useHolidaysQuery'
import { useCalendarViewDate } from '../../stores/useCalendarViewDate'
import { capitalize } from '../../utils/capitalize'
import { DeleteHolidayForm } from './DeleteHolidayForm'

export function DeleteHolidayModal() {
  const { data: holidays } = useHolidaysQuery()
  const [selectedDate] = useCalendarViewDate()

  const holidaysInSelectedMonth = useMemo(() => {
    return holidays?.filter((holiday) =>
      dayjs(selectedDate).isSame(holiday.date, 'month'),
    )
  }, [selectedDate, holidays])

  const monthAndYear = capitalize(dayjs(selectedDate).format('MMMM/YYYY'))

  const isEmptyList = holidaysInSelectedMonth?.length === 0

  return (
    <Modal.Root>
      <Modal.Trigger colorScheme="red">Remover feriado</Modal.Trigger>

      <Modal.Content>
        <Modal.Header>Feriados de {monthAndYear}</Modal.Header>

        <Modal.Body mb="8" display="flex" flexDir="column" gap="2">
          {isEmptyList ? (
            <EmptyMessage>Não há feriados.</EmptyMessage>
          ) : (
            holidaysInSelectedMonth?.map((holiday, index) => {
              const isNotLastItem = holidaysInSelectedMonth.length > index + 1

              return (
                <Fragment key={holiday.id}>
                  <DeleteHolidayForm holiday={holiday} />
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
