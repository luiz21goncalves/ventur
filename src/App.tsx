import { ChakraProvider } from '@chakra-ui/react';

import { theme } from './styles/theme';
import { Home } from './screens/Home';

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <Home />
    </ChakraProvider>
  );
}
