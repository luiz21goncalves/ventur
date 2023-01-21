import { Button, Flex, HStack } from '@chakra-ui/react'

import { InputNumber } from '../../components/Inputs/InputNumber'
import { InputText } from '../../components/Inputs/InputText'
import { InputWeekday } from '../../components/Inputs/InputWeekday'

export function CreateStudent() {
  return (
    <Flex as="form" flexDir="column" gap="6">
      <InputText label="Nome" />
      <InputText label="Aniversário" isRequired={false} />
      <InputText label="Email" type="email" isRequired={false} />
      <InputText label="Senha" isRequired={false} />
      <InputWeekday />

      <HStack gap="6">
        <InputNumber label="Aulas por semana" showStepper min={1} max={7} />
        <InputNumber label="Preço por mês" precision={2} />
      </HStack>

      <Flex justifyContent="space-between">
        <Button
          variant="ghost"
          colorScheme="red"
          px="8"
          textTransform="uppercase"
        >
          Limpar
        </Button>

        <Button
          type="submit"
          colorScheme="green"
          px="8"
          textTransform="uppercase"
        >
          Salvar
        </Button>
      </Flex>
    </Flex>
  )
}
