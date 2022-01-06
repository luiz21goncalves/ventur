import { useEffect, useLayoutEffect, useRef, useState } from 'react';

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
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { BaseScreen } from '../../../components/BaseScreen';
import { Input, Select } from '../../../components/Form';

export function CreateAttendanceList() {
  const { date } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [studentsRaw, setStudentsRaw] = useState([]);
  const [students, setStudents] = useState([]);

  const [year, month, day] = date?.split('-');

  useLayoutEffect(() => {
    window.Main.getAttendanceList(date);
  }, [date]);

  useEffect(() => {
    window.Main.on('show-attendance-list', (data) => {
      if (data) {
        setStudentsRaw(data.students);
      }
    });

    return () => {
      window.Main.unsubscribe('show-attendance-list', setStudentsRaw);
    };
  }, []);

  useEffect(() => {
    setStudents(
      studentsRaw.map(({ _id, name, attendance }) => ({
        _id,
        name,
        attendance,
      }))
    );
  }, [studentsRaw]);

  async function handleSubmit({ students }) {
    window.Main.createOrUpdateAttendanceList({ date, students });
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
