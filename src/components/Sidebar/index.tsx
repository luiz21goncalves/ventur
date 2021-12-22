import { Button, Flex, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export function Sidebar() {
  const navigate = useNavigate();

  return (
    <Flex
      width="60"
      height="full"
      alignItems="center"
      justifyContent="center"
      px="4"
      background="gray.800"
      as="aside"
    >
      <Stack as="nav" direction="column" spacing="4" width="full">
        <Button onClick={() => navigate('/')}>Home</Button>
        <Button onClick={() => navigate('/students')}>ALunos</Button>
      </Stack>
    </Flex>
  );
}
