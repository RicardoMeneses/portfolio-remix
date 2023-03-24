import { Box } from '@chakra-ui/react';
import Header from './general/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box position='relative' minHeight={{ md: '100vh' }}>
      <Header />
      <main>{children}</main>
    </Box>
  );
};

export default Layout;
