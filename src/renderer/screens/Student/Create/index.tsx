import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { BaseScreen } from '../../../components/BaseScreen';

type Student = {
  name: string;
  email?: string;
  password?: string;
  classes_per_week: number;
  price_per_month: number;
};

export function StudentCreate() {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data: Student) {
    try {
      const student = await window.Main.createStudent(data);
      toast({
        title: 'Aluno criado com sucesso',
        status: 'success',
        position: 'top',
      });
      navigate(`/students/${student._id}`);
    } catch (error) {
      toast({
        title: 'Não foi possível criar aluno',
        status: 'error',
        position: 'top',
      });
    }
  }

  return (
    <BaseScreen title="Novo aluno">
      <Stack as="form" spacing="4" onSubmit={handleSubmit(onSubmit)}>
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

        <FormControl isRequired>
          <FormLabel htmlFor="name">Nome</FormLabel>
          <Input id="name" {...register('name', { required: true })} />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" type="email" {...register('email')} />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">Senha</FormLabel>
          <Input id="password" {...register('password')} />
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>

        <Stack direction="row" spacing="8">
          <FormControl isRequired>
            <FormLabel htmlFor="classes_per_week">Aulas por semana</FormLabel>
            <NumberInput defaultValue={0} min={0} max={7}>
              <NumberInputField
                id="classes_per_week"
                {...register('classes_per_week', { valueAsNumber: true })}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormErrorMessage>{errors.classes_per_week}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="price_per_month">Preço por mês</FormLabel>
            <NumberInput defaultValue={0} precision={2}>
              <NumberInputField
                id="price_per_month"
                {...register('price_per_month', { valueAsNumber: true })}
              />
            </NumberInput>
            <FormErrorMessage>{errors.price_per_month}</FormErrorMessage>
          </FormControl>
        </Stack>
      </Stack>
    </BaseScreen>
  );
}
