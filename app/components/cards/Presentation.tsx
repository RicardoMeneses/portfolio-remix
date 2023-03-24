import { Card, useColorModeValue, Image, CardBody, Text, Flex } from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import DownloadCv from '../buttons/DownloadCV';
import IconLinkButton from '../buttons/IconLinkButton';

const Presentation = () => {
  const bg = useColorModeValue('white', 'darkbluer');
  const textColor = useColorModeValue('darkbluer', 'ghostwhiter');
  return (
    <Card
      height={{ base: '410px', md: '380px' }}
      bg={bg}
      width='24rem'
      borderRadius='3xl'
      position='relative'
      boxShadow='-2px 2px 3px 0px rgba(210,214,230,0.97)'
      textColor={textColor}
    >
      <Image
        borderRadius='full'
        src='/img/me.webp'
        alt='Ricardo Meneses Morales'
        objectFit={'cover'}
        position='absolute'
        top='-5rem'
        left='0'
        right='0'
        height='11rem'
        width='11rem'
        border='2px solid #4ad0ed'
        marginLeft={'auto'}
        marginRight={'auto'}
      />
      <CardBody marginTop='6rem'>
        <Text textAlign='center'>¡Hola, Mundo! 👋🏻</Text>
        <Text fontSize='2xl' textAlign='center'>
          Soy Ricardo Meneses
        </Text>
        <Text fontSize='sm' textAlign='center'>
          Desarrollador Web Full Stack
        </Text>
        <TypeAnimation
          sequence={['Front-end', 1500, 'Back-end', 1500]}
          style={{
            fontSize: '18px',
            textAlign: 'center',
          }}
          wrapper='p'
          repeat={Infinity}
        />
        <DownloadCv />
        <Flex justifyContent='center' alignItems='center' marginTop='15px' gap={5}>
          <IconLinkButton
            link='https://www.linkedin.com/in/ricardo-meneses-morales/'
            icon={FaLinkedin}
          />
          <IconLinkButton link='https://github.com/RicardoMeneses' icon={FaGithub} />
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Presentation;
