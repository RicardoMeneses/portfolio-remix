import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { IoIosSchool } from 'react-icons/io';
import { MdWork } from 'react-icons/md';

type Experience = {
  years: string;
  title: string;
  description: string;
  name?: string;
};

interface ExperienceProps {
  type: string;
  items?: Experience[];
}

const Experience: React.FC<ExperienceProps> = ({ type, items }) => {
  const { t } = useTranslation();
  const backgroundColor = useColorModeValue('#051139', '#fff');
  const textColor = useColorModeValue('#fff', '#051139');
  return (
    <Box
      width='full'
      padding={{ base: '1.25rem', lg: '2.5rem' }}
      borderRadius='xl'
      backgroundColor={backgroundColor}
      textColor={textColor}
    >
      <Heading textAlign='center' marginBottom='0.75rem' fontSize='2xl' fontWeight={700}>
        {type === 'work' ? t('resume.work') : t('resume.education')}
      </Heading>
      {items?.map((item, index) => (
        <Box
          borderLeft='4px solid'
          borderLeftColor='#4ad0ed'
          paddingLeft='1.25rem'
          paddingX={{ lg: '2rem' }}
          position='relative'
          textColor={textColor}
          key={index}
        >
          <Flex
            position='absolute'
            width='1.75rem'
            height='1.75rem'
            backgroundColor='#fff'
            alignItems='center'
            justifyContent='center'
            top={0}
            left={-4}
            borderRadius='full'
            border='3px solid #4ad0ed'
          >
            {type === 'work' ? <MdWork color='#051139' /> : <IoIosSchool color='#051139' />}
          </Flex>
          <Text marginBottom={5} fontSize='sm'>
            {item.years}
          </Text>
          <Text fontWeight='bold'>{item.title}</Text>
          {item.name && (
            <Text marginBottom={2} fontSize='sm'>
              {item.name}
            </Text>
          )}
          <Text paddingBottom={5} marginTop={3}>
            {item.description}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default Experience;
