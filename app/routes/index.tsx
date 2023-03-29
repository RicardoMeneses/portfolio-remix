import {
  Container,
  Box,
  Flex,
  Heading,
  useColorModeValue,
  Text,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Presentation from '~/components/cards/Presentation';
import Layout from '~/components/Layout';
import { LinksFunction } from '@remix-run/node';

import styles from '@szhsin/react-menu/dist/transitions/slide.css';
import stylesMenu from '@szhsin/react-menu/dist/index.css';
import { useTranslation } from 'react-i18next';
import DownloadCv from '~/components/buttons/DownloadCV';

import { RiCodeLine, RiPingPongFill, RiBook2Fill, RiMovie2Fill } from 'react-icons/ri';
import { BsAirplaneFill, BsFillFileMusicFill } from 'react-icons/bs';
import { IoLogoGameControllerB } from 'react-icons/io';
import { FaFutbol } from 'react-icons/fa';
import Interest from '~/components/cards/Interest';
import Projects from '~/components/sections/Projects';
import Resume from '~/components/sections/Resume';
import { useEffect } from 'react';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: stylesMenu },
  ];
};

export default function Index() {
  const { t } = useTranslation();
  const textColor = useColorModeValue('#051139', '#fff');

  const interests = [
    {
      icon: RiCodeLine,
      text: t('about.programming'),
    },
    {
      icon: RiPingPongFill,
      text: t('about.pingPong'),
    },
    {
      icon: BsAirplaneFill,
      text: t('about.travel'),
    },
    {
      icon: IoLogoGameControllerB,
      text: t('about.games'),
    },
    {
      icon: RiBook2Fill,
      text: t('about.read'),
    },
    {
      icon: BsFillFileMusicFill,
      text: t('about.music'),
    },
    {
      icon: FaFutbol,
      text: t('about.soccer'),
    },
    {
      icon: RiMovie2Fill,
      text: t('about.cinema'),
    },
  ];

  function reveal() {
    const reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 100;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('activeElement');
      } else {
        reveals[i].classList.remove('activeElement');
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', reveal);

    return () => window.removeEventListener('scroll', reveal);
  }, []);
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
            height='100vh'
            width='100%'
            backgroundColor='#00000080'
          />
          <Flex
            height='100%'
            justifyContent={{ base: 'center', md: 'start' }}
            alignItems='center'
            paddingLeft={{ base: '0', md: '200' }}
          >
            <Presentation />
          </Flex>
        </Box>
      </section>
      <Container maxW='full' paddingX={{ base: 10, md: 5, lg: 70 }}>
        <section id='aboutMe' style={{ margin: '50px 0' }}>
          <Heading as='h1' fontWeight={700} fontSize='5xl' textAlign='center' textColor={textColor}>
            {t('about.title')}
          </Heading>
          <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            marginTop='30px'
            alignItems='center'
            justifyContent='center'
            gap={10}
          >
            <Box width={{ base: 'full', md: '50%' }} className='reveal'>
              <Text textColor={textColor} marginBottom='25px' textAlign='center' fontSize='xl'>
                {t('about.me')}
              </Text>
              <DownloadCv />
            </Box>
            <Box width={{ base: 'full', md: '50%' }}>
              <Heading
                as='h2'
                fontSize='2xl'
                fontWeight={700}
                textColor={textColor}
                textAlign='center'
              >
                {t('about.interests')}
              </Heading>
              <Grid
                className='reveal'
                gap={4}
                marginTop={4}
                templateColumns={{
                  base: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)',
                }}
                justifyContent={'center'}
                alignItems='center'
              >
                {interests.map((interest) => (
                  <GridItem key={interest.text}>
                    <Interest icon={interest.icon} title={interest.text} />
                  </GridItem>
                ))}
              </Grid>
            </Box>
          </Flex>
        </section>
        <Projects />
        <Resume />
      </Container>
    </Layout>
  );
}
