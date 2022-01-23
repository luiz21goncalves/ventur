import { useEffect, useRef, useState } from 'react';

import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { BaseScreen } from '../../../components/BaseScreen';
import { Input, Select } from '../../../components/Form';

type Student = {
  _id: string;
  name: string;
  attendance: string;
};

export function CreateAttendanceList() {
  const { date } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const toast = useToast();

  const [students, setStudents] = useState<Student[]>([]);

  const [year, month, day] = date?.split('-');

  useEffect(() => {
    async function load() {
      const allStudents = await window.Main.getAllStudents();
      const response = await window.Main.getAttendanceList({
        month,
        year,
        day,
      });

      if (response && response.students) {
        setStudents(response.students);
      } else {
        setStudents(
          allStudents.map(({ _id, name }) => ({
            _id,
            name,
            attendance: 'false',
          }))
        );
      }
    }
    load();
  }, [year, month, day, toast]);

  async function handleSubmit({ students }) {
    try {
      await window.Main.createOrUpdateAttendanceList({
        year,
        month,
        day,
        students,
      });
      toast({
        title: 'Lista de presença atualizada com sucesso',
        status: 'success',
        position: 'top',
      });
    } catch {
      toast({
        title: 'Ocorreu um erro ao salvar a lista de presença',
        status: 'error',
        position: 'top',
      });
    }
  }

  return (
    <BaseScreen title="Lista de presença">
      <Form ref={formRef} onSubmit={handleSubmit} initialData={{ students }}>
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

        <Stack spacing="8">
          <Text>
            Dia: {day}/{month}/{year}
          </Text>

          {students.map(({ _id, name }, index) => (
            <Box key={_id}>
              <Scope path={`students[${index}]`}>
                <Input name="_id" type="hidden" placeholder="_id" />
                <Input name="name" type="hidden" placeholder="name" />

                <Grid templateColumns="1fr 140px" gap="2">
                  <Text>{name}</Text>

                  <Select name="attendance">
                    <option value="false">Ausente</option>
                    <option value="true">Presente</option>
                  </Select>
                </Grid>
                <Divider marginTop="4" />
              </Scope>
            </Box>
          ))}
        </Stack>
      </Form>
    </BaseScreen>
  );
}
