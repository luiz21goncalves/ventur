import {
  chakra,
  CheckboxProps,
  Flex,
  SystemStyleObject,
  Text,
  useCheckbox,
} from '@chakra-ui/react'

export function DayInput(props: CheckboxProps) {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props)

  const darkStyles = getDarkStyles(state.isChecked)

  return (
    <chakra.label p="0.5" {...htmlProps}>
      <input {...getInputProps()} hidden />
      <Flex
        bg={state.isChecked ? 'pink.500' : 'gray.500'}
        w="full"
        h="full"
        align="center"
        justify="center"
        borderRadius="lg"
        cursor="pointer"
        _disabled={disabledStyles}
        _dark={darkStyles}
        {...getCheckboxProps()}
      >
        <Text
          fontWeight="bold"
          fontSize="lg"
          color={state.isChecked ? 'white' : undefined}
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

const getDarkStyles = (checked: boolean): SystemStyleObject => {
  return {
    bg: `${checked ? 'pink.700' : 'gray.700'}`,
  }
}
