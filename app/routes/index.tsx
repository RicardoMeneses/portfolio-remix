import { FaRegArrowAltCircleDown } from 'react-icons/fa';
import { Container, Box, Flex } from '@chakra-ui/react';
import Presentation from '~/components/cards/Presentation';
import Layout from '~/components/Layout';

export default function Index() {
  return (
    <Layout>
      <section id='home'>
        <Box
          backgroundImage={`url("/img/bg.webp")`}
          height='100vh'
          backgroundSize='cover'
          backgroundRepeat='no-repeat'
          backgroundPosition='center'
        >
          <Box
            position='absolute'
            top='0'
            left='0'
            height='100%'
            width='100%'
            backgroundColor='#00000080'
          />
          <Container position='relative' height='100%'>
            <Flex height='100%' justifyContent='center' alignItems='center'>
              <Presentation />
            </Flex>
          </Container>
        </Box>
      </section>
    </Layout>
  );
}

/*
  <div className='bg-[url("/img/bg.webp")] bg-center bg-no-repeat bg-cover'>
    <div className='h-screen relative'>
      <div className='absolute top-0 left-0 h-full w-full bg-black/50'></div>
      <FaRegArrowAltCircleDown
        className='absolute text-white bottom-32 md:bottom-10 animate-pulse text-4xl cursor-pointer z-20 left-0 right-0 mx-auto'
      />
      <div className='h-full relative flex items-center px-10 md:px-56'>
        <h1>Hola</h1>
      </div>
    </div>
  </div>
*/
