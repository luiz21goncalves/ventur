import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from '@chakra-ui/react'

type InputNumberProps = Omit<NumberInputProps, 'children'> & {
  label: string
  showStepper?: boolean
}

export function InputNumber(props: InputNumberProps) {
  const { label, isRequired = true, showStepper = false, ...attrs } = props

  return (
    <FormControl isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>

      <NumberInput {...attrs}>
        <NumberInputField />
        {showStepper && (
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        )}
      </NumberInput>
    </FormControl>
  )
}
