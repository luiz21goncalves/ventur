import { FormControl, FormLabel, Input, InputProps } from '@chakra-ui/react'
import { ElementRef, forwardRef } from 'react'

type InputTextProps = InputProps & {
  label: string
  errorMessage?: string
}

export const InputText = forwardRef<ElementRef<typeof Input>, InputTextProps>(
  (props, ref) => {
    const { label, isRequired = true, errorMessage, ...attrs } = props

    return (
      <FormControl isRequired={isRequired}>
        <FormLabel>{label}</FormLabel>
        <Input ref={ref} {...attrs} />
      </FormControl>
    )
  },
)

InputText.displayName = 'InputText'
