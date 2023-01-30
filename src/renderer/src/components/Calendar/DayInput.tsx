import {
  chakra,
  CheckboxProps,
  Flex,
  SystemStyleObject,
  Text,
  useCheckbox,
  useColorModeValue,
} from '@chakra-ui/react'

type DayInputProps = CheckboxProps & {
  isHoliday: boolean
}

export function DayInput(props: DayInputProps) {
  const { isHoliday, ...attrs } = props

  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(attrs)

  const defaultBackgroundColor = useColorModeValue('gray.400', 'gray.700')
  const selectedBackgroundColor = useColorModeValue('blue.500', 'blue.600')
  const holidayBackgroundColor = useColorModeValue('red.500', 'red.600')

  const backgroundColor = state.isChecked
    ? selectedBackgroundColor
    : isHoliday
    ? holidayBackgroundColor
    : defaultBackgroundColor

  const textColor = state.isChecked || isHoliday ? 'white' : undefined

  return (
    <chakra.label p="0.5" {...htmlProps}>
      <input {...getInputProps()} hidden />
      <Flex
        bg={backgroundColor}
        w="full"
        h="full"
        align="center"
        justify="center"
        borderRadius="lg"
        cursor="pointer"
        _disabled={disabledStyles}
        {...getCheckboxProps()}
      >
        <Text
          fontWeight="bold"
          fontSize="lg"
          color={textColor}
          {...getLabelProps()}
        >
          {props.children}
        </Text>
      </Flex>
    </chakra.label>
  )
}

const disabledStyles: SystemStyleObject = {
  cursor: 'not-allowed',
  opacity: '0.4',
}
