import { Box } from '@chakra-ui/react';
import Footer from './general/Footer';
import Header from './general/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box position='relative' minHeight={{ md: '100vh' }}>
      <Header />
      <main>
        {children}
        <Footer />
      </main>
    </Box>
  );
};

export default Layout;
