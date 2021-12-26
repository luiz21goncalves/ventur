import { ReactNode } from 'react';

import { Box, Flex } from '@chakra-ui/react';

import { Sidebar } from '../Sidebar';

type BaseScreenProps = {
  children: ReactNode;
};

export function BaseScreen(props: BaseScreenProps) {
  const { children } = props;

  return (
    <Flex
      width="full"
      height="100vh"
      alignItems="center"
      justifyContent="space-between"
    >
      <Sidebar />

      <Flex flex="1" alignItems="center" justifyContent="center">
        <Box height="container.sm">{children}</Box>
      </Flex>
    </Flex>
  );
}
