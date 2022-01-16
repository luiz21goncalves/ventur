import { ReactNode } from 'react';

import { Box, Flex, Heading } from '@chakra-ui/react';

import { Sidebar } from '../Sidebar';

type BaseScreenProps = {
  children: ReactNode;
  title: string;
};

export function BaseScreen(props: BaseScreenProps) {
  const { children, title } = props;

  return (
    <Flex
      width="full"
      height="100vh"
      alignItems="center"
      justifyContent="space-between"
    >
      <Sidebar />

      <Flex
        flex="1"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading marginBottom="8">{title}</Heading>

        <Box width="container.sm" height="container.sm">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
