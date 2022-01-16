import { useEffect, useLayoutEffect, useState } from 'react';

import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { BaseScreen } from '../../../components/BaseScreen';

type Student = {
  _id: string;
  name: string;
};

export function StudentList() {
  const navigate = useNavigate();

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

  return (
    <BaseScreen title="Lista de alunos">
      <Flex width="full" justifyContent="space-between" my="8">
        <Button
          width="40"
          colorScheme="red"
          variant="outline"
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>

        <Button
          width="40"
          colorScheme="green"
          onClick={() => navigate('create')}
        >
          Novo aluno
        </Button>
      </Flex>

      <Box overflowY="auto">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th width="full">Nome</Th>
              <Th />
            </Tr>
          </Thead>

          <Tbody>
            {students.map((student) => (
              <Tr key={student._id}>
                <Td>{student.name}</Td>
                <Td>
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => navigate(student._id)}
                  >
                    Detalhes
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </BaseScreen>
  );
}
