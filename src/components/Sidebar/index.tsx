import { Flex, Stack } from '@chakra-ui/react';

import { ActiveButton } from './ActiveButton';

export function Sidebar() {
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
        <ActiveButton shouldMatchExactHref to="/">
          Home
        </ActiveButton>
        <ActiveButton to="/students">Alunos</ActiveButton>
        <ActiveButton to="/attendance-list">Presença</ActiveButton>
      </Stack>
    </Flex>
  );
}
