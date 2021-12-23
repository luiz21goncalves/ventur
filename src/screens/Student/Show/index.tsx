import { useEffect, useLayoutEffect, useState } from 'react';

import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { BaseScreen } from '../../../components/BaseScreen';

export function ShowStudent() {
  const { state } = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState();

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
    if (state) {
      setStudent(state);
    }
  }, [state]);

  return (
    <BaseScreen>
      <Box width="container.sm">
        <Heading textAlign="center">Detalhes do Aluno</Heading>

        <Flex width="full" justifyContent="space-between" my="8">
          <Button
            width="40"
            colorScheme="red"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Voltar
          </Button>

          <Button width="40" colorScheme="red">
            Excluir aluno
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
