import { ChakraProvider } from '@chakra-ui/react';

import { theme } from './styles/theme';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppRoutes />
    </ChakraProvider>
  );
}
