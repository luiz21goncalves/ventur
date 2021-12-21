import { ReactNode } from 'react';

import { Flex } from '@chakra-ui/react';

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
      justifyContent="center"
      flexDirection="column"
    >
      {children}
    </Flex>
  );
}
