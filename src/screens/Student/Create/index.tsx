import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { BaseScreen } from '../../../components/BaseScreen';

export function StudentCreate() {
  const navigate = useNavigate();

  return (
    <BaseScreen>
      <Box width="container.sm">
        <Heading textAlign="center">Novo aluno</Heading>

        <Flex width="full" justifyContent="space-between" my="8">
          <Button
            width="40"
            colorScheme="red"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Voltar
          </Button>

          <Button width="40" colorScheme="green" type="submit">
            Salvar
          </Button>
        </Flex>

        <Stack as="form" spacing="4">
          <FormControl isRequired>
            <FormLabel htmlFor="name">Nome</FormLabel>
            <Input id="name" type="email" />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <Input id="password" />
          </FormControl>

          <Stack direction="row" spacing="8">
            <FormControl isRequired>
              <FormLabel htmlFor="classes_per_week">Aulas por semana</FormLabel>
              <NumberInput defaultValue={0} min={0} max={7}>
                <NumberInputField id="classes_per_week" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="price_per_month">Preço por mês</FormLabel>
              <NumberInput defaultValue={0} precision={2}>
                <NumberInputField id="price_per_month" />
              </NumberInput>
            </FormControl>
          </Stack>
        </Stack>
      </Box>
    </BaseScreen>
  );
}
