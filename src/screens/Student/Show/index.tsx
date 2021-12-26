import { useState, useLayoutEffect, useEffect } from 'react';

import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { BaseScreen } from '../../../components/BaseScreen';
import { useStudentData } from '../../../stores';

export function ShowStudent() {
  const params = useParams();
  const navigate = useNavigate();

  const initialData = useStudentData();
  const [student, setStudent] = useState(initialData);

  useLayoutEffect(() => {
    window.Main.getStudent(params.id);
  }, [params]);

  useEffect(() => {
    window.Main.on('get-student-response', setStudent);

    return () => {
      window.Main.unsubscribe('get-student-response', setStudent);
    };
  }, []);

  return (
    <BaseScreen>
      <Box width="container.sm">
        <Heading textAlign="center">Detalhes do Aluno</Heading>

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
            Editart aluno
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
      </Box>
    </BaseScreen>
  );
}
