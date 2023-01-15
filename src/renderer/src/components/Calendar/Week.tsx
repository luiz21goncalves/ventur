import { Button, SystemStyleObject, Td, Tr } from '@chakra-ui/react'
import { Dayjs } from 'dayjs'
import { useId } from 'react'

type WeekProps = {
  days: Array<{ date: Dayjs; disabled: boolean }>
}

export function Week(props: WeekProps) {
  const { days } = props

  const id = useId()

  return (
    <Tr>
      {days.map(({ date, disabled }) => {
        const key = `${id}-${date.toISOString()}`
        const day = date.get('date')

        return (
          <Td key={key} px="none" py="none">
            <Button
              w="full"
              bgColor="gray.400"
              borderRadius="lg"
              fontWeight="semibold"
              fontSize="lg"
              disabled={disabled}
              __css={styles}
              _active={activeStyles}
              _disabled={disabledStyles}
              _dark={darkStyles}
              _hover={houverStyles}
            >
              {day}
            </Button>
          </Td>
        )
      })}
    </Tr>
  )
}

const styles: SystemStyleObject = {
  aspectRatio: '1 / 1',
}

const activeStyles: SystemStyleObject = {
  bgColor: 'gray.500',
  outline: '2px solid gray.50',
}

const houverStyles: SystemStyleObject = {
  opacity: '0.8',
}

const darkStyles: SystemStyleObject = {
  bgColor: 'gray.700',
}

const disabledStyles: SystemStyleObject = {
  aspectRatio: '1 / 1',
  cursor: 'not-allowed',
  opacity: '0.4',
}
