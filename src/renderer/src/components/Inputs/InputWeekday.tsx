import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  HStack,
  Text,
} from '@chakra-ui/react'
import { UseFormRegister } from 'react-hook-form'

import { getWeekdays } from '../../utils/get-weekdays'

const weekdays = getWeekdays()

type Fields =
  | {
      birthdate: string | null
      name: string
      price_per_month: number
      weekdays_with_class: boolean[]
    }
  | {
      birthdate: string | null
      name: string
      price_per_month: number
      weekdays_with_class: boolean[]
      id: string
    }

type OnRegisterField = UseFormRegister<Fields>

type InputWeekdayProps = {
  errorMessage?: string
  onRegisterField: OnRegisterField
}

export function InputWeekday(props: InputWeekdayProps) {
  const { errorMessage, onRegisterField } = props

  return (
    <FormControl>
      <FormLabel>Dias de aula</FormLabel>
      <CheckboxGroup>
        <HStack w="full" gap="2">
          {weekdays.short.map((weekday, index) => {
            const label = weekday.toUpperCase()

            return (
              <Text
                as="label"
                key={weekday}
                w="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="1"
              >
                <Checkbox
                  size="lg"
                  {...onRegisterField(`weekdays_with_class.${index}`)}
                />

                {label}
              </Text>
            )
          })}
        </HStack>
      </CheckboxGroup>

      <Text textColor="gray" fontSize="sm" mt="0.5">
        {errorMessage}
      </Text>
    </FormControl>
  )
}
