import { useState, useLayoutEffect, useEffect } from 'react';

import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { BaseScreen } from '../../../components/BaseScreen';

type Student = {
  _id: string;
  name: string;
};

export function CreateAttendanceList() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [students, setStudents] = useState<Student[]>([]);

  useLayoutEffect(() => {
    window.Main.getAllStudents();
  }, []);

  useEffect(() => {
    window.Main.on('all-students', setStudents);

    return () => {
      window.Main.unsubscribe('all-students', setStudents);
    };
  }, []);

  function onSubmit(data: unknown) {
    window.Main.createAttendanceList(data);
    navigate(`attendance-list/${data.date}`);
  }

  return (
    <BaseScreen>
      <Heading textAlign="center">Lista de Presença</Heading>

      <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing="8">
        <Flex width="full" justifyContent="space-between" my="8">
          <Button
            width="40"
            colorScheme="red"
            variant="outline"
            onClick={() => navigate('/')}
          >
            Voltar
          </Button>

          <Button width="40" colorScheme="green" type="submit">
            Salvar
          </Button>
        </Flex>
        <FormControl isRequired>
          <FormLabel htmlFor="date">Data</FormLabel>
          <Input id="date" type="date" {...register('date')} />
        </FormControl>

        {students.map(({ _id, name }) => (
          <Checkbox
            key={_id}
            defaultValue="false"
            {...register(`students.${name}`)}
          >
            {name}
          </Checkbox>
        ))}
      </Stack>
    </BaseScreen>
  );
}
