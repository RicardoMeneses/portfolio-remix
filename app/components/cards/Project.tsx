import { RiArrowRightLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { Box, Flex, Heading, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { Link } from '@remix-run/react';

type Project = {
  img: string;
  title: string;
  description: string;
  tech: string;
  link: string;
};

interface ProyectProps {
  project: Project;
  index: number;
}

const Project: React.FC<ProyectProps> = ({ project, index }) => {
  const { title, img, description, tech, link } = project;
  const { t } = useTranslation();
  const backgroundColor = useColorModeValue('#051139', '#fff');
  const textColor = useColorModeValue('#fff', '#051139');
  const borderColor = useColorModeValue('#fff', '#051139');
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      gap={10}
      alignItems='center'
      justifyContent='center'
      backgroundColor={backgroundColor}
      marginTop='50px'
      borderRadius='3xl'
      padding='2.5rem'
    >
      <Box
        height={{ base: '10rem', md: '200px', lg: '300px' }}
        width={{ base: 'full', md: '50%' }}
        position='relative'
        order={index % 2 === 0 ? 1 : 2}
      >
        <Image
          src={img}
          alt={title}
          objectFit='cover'
          width='full'
          height='full'
          borderRadius='md'
          display='block'
          position='relative'
          zIndex={10}
          border='3px solid'
          borderColor={borderColor}
        />
        <Box
          height={{ base: '10rem', md: '200px', lg: '300px' }}
          width='full'
          position='absolute'
          top={3}
          left={index % 2 === 0 ? -4 : ''}
          right={index % 2 === 0 ? 0 : -4}
          border='3px solid #4ad0ed'
          borderRadius='md'
        />
      </Box>
      <Box
        width={{ base: 'full', md: '50%' }}
        textAlign={{ base: 'center', md: index % 2 === 0 ? 'left' : 'right' }}
        textColor={textColor}
        order={index % 2 === 0 ? 2 : 1}
      >
        <Heading>{title}</Heading>
        <Text>{description}</Text>
        <Text fontSize='2xs' margin={'10px 0'}>
          {tech}
        </Text>
        <Link to={link} target='_blank'>
          <Flex
            gap={2}
            alignItems='center'
            justifyContent='center'
            marginLeft={`${index % 2 === 0 ? '' : 'auto'}`}
            border='3px solid #4ad0ed'
            width={{ base: 'full', md: 'fit-content' }}
            padding='5px 10px'
            transition='all 0.3s ease-in'
            _hover={{ textColor: 'white', backgroundColor: 'lightbluer' }}
          >
            {t('projects.see')} <RiArrowRightLine />
          </Flex>
        </Link>
      </Box>
    </Flex>
  );
};

export default Project;

/*
<div className=' gap-10 md:gap-5 lg:gap-10 items-center justify-center'>


        <Link
          to={link}
          target='_blank'
          className={`flex gap-2 items-center ${
            index % 2 === 0 ? '' : 'float-right'
          } text-ghostwhite dark:text-darkblue justify-center px-3 py-2 w-full md:w-fit ring-2 ring-deepskyblue hover:bg-deepskyblue hover:text-white`}
        >
          {t('projects.see')} <RiArrowRightLine />
        </Link>

    </div>
*/
