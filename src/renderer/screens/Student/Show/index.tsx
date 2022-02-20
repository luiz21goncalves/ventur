import { useState, useEffect } from 'react';

import { Button, Divider, Flex, Stack, Text, useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { BaseScreen } from '../../../components/BaseScreen';

type Student = {
  _id: string;
  name: string;
  email?: string;
  password?: string;
  birthday?: string;
  classes_per_week: number;
  price_per_month: number;
};

export function ShowStudent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const [student, setStudent] = useState<Student>({} as Student);

  useEffect(() => {
    async function loadStudent() {
      try {
        const studentResponse = await window.Main.getStudent({ _id: id });
        setStudent(studentResponse);
      } catch {
        toast({
          title: 'Não foi possível carregar aluno',
          status: 'error',
          position: 'top',
        });
      }
    }

    loadStudent();
  }, [id, toast]);

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
              Aniversário:
            </Text>
            <Text fontSize="lg">{student.birthday}</Text>
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
