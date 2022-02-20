import { Button, Flex, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { BaseScreen } from '../../../components/BaseScreen';
import { StudentForm } from '../Form';

type Student = {
  name: string;
  email?: string;
  password?: string;
  birthday?: string;
  classes_per_week: number;
  price_per_month: number;
};

export function StudentCreate() {
  const navigate = useNavigate();
  const toast = useToast();

  async function handleSubmit({
    name,
    email,
    password,
    birthday,
    classes_per_week,
    price_per_month,
  }: Student) {
    try {
      const student = await window.Main.createStudent({
        name,
        email,
        password,
        classes_per_week,
        birthday,
        price_per_month,
      });

      toast({
        title: 'Aluno criado com sucesso',
        status: 'success',
        position: 'top',
      });
      navigate(`/students/${student._id}`);
    } catch (error) {
      toast({
        title: 'Não foi possível criar aluno',
        status: 'error',
        position: 'top',
      });
    }
  }

  return (
    <BaseScreen title="Novo aluno">
      <StudentForm onSubmit={handleSubmit}>
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
      </StudentForm>
    </BaseScreen>
  );
}
