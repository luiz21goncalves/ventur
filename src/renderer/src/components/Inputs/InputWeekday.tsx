import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  HStack,
  SystemStyleObject,
  useColorModeValue,
} from '@chakra-ui/react'

import { getWeekdays } from '../../utils/get-weekdays'

const weekdays = getWeekdays()

export function InputWeekday() {
  const borderColor = useColorModeValue('blue.600', 'cyan.400')

  const checkedStyles = getCheckedStyles(borderColor)

  return (
    <FormControl isRequired>
      <FormLabel>Dias de aula</FormLabel>
      <CheckboxGroup>
        <HStack gap="4">
          {weekdays.short.map((weekday) => {
            const label = weekday.toUpperCase()

            return (
              <Checkbox
                key={weekday}
                value={weekday}
                h="10"
                borderWidth="medium"
                borderRadius="lg"
                w="full"
                size="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                _checked={checkedStyles}
              >
                {label}
              </Checkbox>
            )
          })}
        </HStack>
      </CheckboxGroup>
    </FormControl>
  )
}

const getCheckedStyles = (borderColor: string): SystemStyleObject => {
  return { borderColor }
}
