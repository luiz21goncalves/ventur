import {
  FormControl,
  FormLabel,
  Input,
  InputProps,
  Text,
  useColorModeValue,
  useToken,
} from '@chakra-ui/react'
import { Asterisk } from 'phosphor-react'
import { ElementRef, forwardRef } from 'react'

type InputTextProps = InputProps & {
  label: string
  errorMessage?: string
}

export const InputText = forwardRef<ElementRef<typeof Input>, InputTextProps>(
  (props, ref) => {
    const { label, isRequired = true, errorMessage, ...attrs } = props

    const [red1, red2] = useToken('colors', ['red.500', 'red.400'])
    const asteriskColor = useColorModeValue(red1, red2)

    return (
      <FormControl>
        <FormLabel display="flex" alignItems="center" gap="px">
          {label}
          {isRequired && (
            <Asterisk weight="bold" size={10} color={asteriskColor} />
          )}
        </FormLabel>
        <Input ref={ref} {...attrs} />
        <Text textColor="gray" fontSize="sm" mt="0.5">
          {errorMessage}
        </Text>
      </FormControl>
    )
  },
)

InputText.displayName = 'InputText'
