import { useState, useLayoutEffect, useEffect } from 'react';

import { Button, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { BaseScreen } from '../../../components/BaseScreen';

type Student = {
  _id: string;
  name: string;
  email?: string;
  password?: string;
  classes_per_week: number;
  price_per_month: number;
};

export function ShowStudent() {
  const { state } = useLocation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [student, setStudent] = useState<Student>(state as Student);

  useLayoutEffect(() => {
    if (id) {
      window.Main.getStudent(id);
    }
  }, [id]);

  useEffect(() => {
    if (!student) {
      window.Main.on('get-student-response', setStudent);
    }

    return () => {
      window.Main.unsubscribe('get-student-response', setStudent);
    };
  }, [student]);

  return (
    <BaseScreen title="Detalhes do Aluno">
      <Flex width="full" justifyContent="space-between" my="8">
        <Button
          width="40"
          colorScheme="red"
          variant="outline"
          onClick={() => navigate('/students')}
        >
          Voltar
        </Button>

        <Button
          width="40"
          colorScheme="green"
          onClick={() => navigate('edit', { state: student })}
        >
          Editar aluno
        </Button>
      </Flex>

      {student && (
        <Stack spacing="4" mt="8">
          <Stack direction="row" spacing="2" alignItems="center">
            <Text fontSize="sm" fontWeight="bold">
              Nome:
            </Text>
            <Text fontSize="lg">{student.name}</Text>
          </Stack>

          <Divider />

          <Stack direction="row" spacing="2" alignItems="center">
            <Text fontSize="sm" fontWeight="bold">
              Email:
            </Text>
            <Text fontSize="lg">{student.email}</Text>
          </Stack>

          <Divider />

          <Stack direction="row" spacing="2" alignItems="center">
            <Text fontSize="sm" fontWeight="bold">
              Senha:
            </Text>
            <Text fontSize="lg">{student.password}</Text>
          </Stack>

          <Divider />

          <Stack direction="row" spacing="2" alignItems="center">
            <Text fontSize="sm" fontWeight="bold">
              Aulas por semana:
            </Text>
            <Text fontSize="lg">{student.classes_per_week}</Text>
          </Stack>

          <Divider />

          <Stack direction="row" spacing="2" alignItems="center">
            <Text fontSize="sm" fontWeight="bold">
              Preço por mês:
            </Text>
            <Text fontSize="lg">{student.price_per_month}</Text>
          </Stack>
        </Stack>
      )}
    </BaseScreen>
  );
}
