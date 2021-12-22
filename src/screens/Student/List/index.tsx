import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { BaseScreen } from '../../../components/BaseScreen';

export function StudentList() {
  const navigate = useNavigate();

  return (
    <BaseScreen>
      <Box width="container.sm">
        <Heading textAlign="center">Lista de alunos</Heading>

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

        <Table variant="striped">
          <Thead>
            <Tr>
              <Th width="full">Nome</Th>
              <Th />
              <Th />
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              <Td>Aluno 001</Td>
              <Td>
                <Button size="xs" variant="outline">
                  Detalhes
                </Button>
              </Td>
              <Td>
                <Button size="xs" variant="outline">
                  Editar
                </Button>
              </Td>
            </Tr>

            <Tr>
              <Td>Aluno 002</Td>
              <Td>
                <Button size="xs" variant="outline">
                  Detalhes
                </Button>
              </Td>
              <Td>
                <Button size="xs" variant="outline">
                  Editar
                </Button>
              </Td>
            </Tr>

            <Tr>
              <Td>Aluno 003</Td>
              <Td>
                <Button size="xs" variant="outline">
                  Detalhes
                </Button>
              </Td>
              <Td>
                <Button size="xs" variant="outline">
                  Editar
                </Button>
              </Td>
            </Tr>

            <Tr>
              <Td>Aluno 004</Td>
              <Td>
                <Button size="xs" variant="outline">
                  Detalhes
                </Button>
              </Td>
              <Td>
                <Button size="xs" variant="outline">
                  Editar
                </Button>
              </Td>
            </Tr>

            <Tr>
              <Td>Aluno 005</Td>
              <Td>
                <Button size="xs" variant="outline">
                  Detalhes
                </Button>
              </Td>
              <Td>
                <Button size="xs" variant="outline">
                  Editar
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </BaseScreen>
  );
}
