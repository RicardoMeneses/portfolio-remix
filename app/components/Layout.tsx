import { Box } from '@chakra-ui/react';
import Chat from './general/Chat';
import Footer from './general/Footer';
import Header from './general/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box position='relative' minHeight={{ md: '100vh' }}>
      <Header />
      <main style={{ overflow: 'hidden' }}>
        {children}
        <Footer />
      </main>
      {/* <Chat /> */}
    </Box>
  );
};

export default Layout;
