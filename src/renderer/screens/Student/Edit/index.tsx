import { useEffect, useState } from 'react';

import { Button, Flex, useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { Input } from '../../../components/Form';
import { BaseScreen } from '../../../components/BaseScreen';
import { StudentForm } from '../Form';

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

  async function handleSubmit(data: Student) {
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
      <StudentForm onSubmit={handleSubmit} initialData={student}>
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

        <Input name="_id" isRequired type="hidden" />
      </StudentForm>
    </BaseScreen>
  );
}
