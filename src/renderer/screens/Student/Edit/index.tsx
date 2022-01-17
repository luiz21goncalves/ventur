import { useEffect, useState } from 'react';

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
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { BaseScreen } from '../../../components/BaseScreen';

type Student = {
  _id: string;
  name: string;
  email?: string;
  password?: string;
  classes_per_month: number;
  price_per_month: number;
};

export function EditStudent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const [student, setStudent] = useState<Student>({} as Student);

  useEffect(() => {
    async function loadStudent() {
      const response = await window.Main.getStudent(id);
      setStudent(response);
    }
    loadStudent();
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: student });

  async function onSubmit(data: Student) {
    try {
      await window.Main.updateStudent(data);
      navigate(`/students/${data._id}`, { state: data });
      toast({
        title: 'Aluno salvo com sucesso',
        status: 'success',
        position: 'top',
      });
    } catch {
      toast({
        title: 'Ocorreu um erro ao salvar o aluno',
        status: 'error',
        position: 'top',
      });
    }
  }

  async function handleDelete() {
    try {
      await window.Main.deleteStudent(id);
      navigate('/students');
      toast({
        title: 'O aluno foi excluído.',
        status: 'success',
        position: 'top',
      });
    } catch {
      toast({
        title: 'Não foi possível excluir esse aluno',
        status: 'error',
        position: 'top',
      });
    }
  }

  return (
    <BaseScreen title="Editar aluno">
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
    </BaseScreen>
  );
}