import { FormControl, FormLabel, Input, InputProps } from '@chakra-ui/react'

type InputTextProps = InputProps & {
  label: string
}

export function InputText(props: InputTextProps) {
  const { label, isRequired = true, ...attrs } = props

  return (
    <FormControl isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <Input {...attrs} />
    </FormControl>
  )
}
