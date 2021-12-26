import { useEffect, useLayoutEffect, useState } from 'react';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { BaseScreen } from '../../../components/BaseScreen';

export function EditStudent() {
  const { state } = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(state);

  useLayoutEffect(() => {
    window.Main.getStudent(params.id);
  }, [params]);

  useEffect(() => {
    window.Main.on('get-student-response', setStudent);

    return () => {
      window.Main.unsubscribe('get-student-response', setStudent);
    };
  }, []);

  useEffect(() => {
    if (!student) {
      window.Main.on('get-student-response', setStudent);
    }

    return () => {
      window.Main.unsubscribe('get-student-response', setStudent);
    };
  }, [student]);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: student });

  function onSubmit(data: unkonwn) {
    window.Main.updateStudent(data);
    reset();
    navigate(`/students/${data._id}`, { state: data });
  }

  function handleDelete() {
    window.Main.deleteStudent(params.id);

    navigate('/students');
  }

  return (
    <BaseScreen>
      <Box width="container.sm">
        <Heading textAlign="center">Editar aluno</Heading>

        <Stack as="form" spacing="4" onSubmit={handleSubmit(onSubmit)}>
          <Flex width="full" justifyContent="space-between" my="8">
            <Button
              width="40"
              colorScheme="red"
              variant="outline"
              onClick={() => handleDelete()}
            >
              Deletar
            </Button>

            <Button width="40" colorScheme="green" type="submit">
              Salvar
            </Button>
          </Flex>

          <FormControl>
            <Input id="_id" type="hidden" {...register('_id')} />
          </FormControl>

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
      </Box>
    </BaseScreen>
  );
}
