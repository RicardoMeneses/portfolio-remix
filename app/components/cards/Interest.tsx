import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

interface InterestsProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
}

const Interest: React.FC<InterestsProps> = ({ icon, title }) => {
  const textColor = useColorModeValue('#051139', '#fff');
  return (
    <Flex
      direction='column'
      gap={3}
      justifyContent='center'
      alignItems='center'
      transition='all 0.3s ease'
      _hover={{ transform: 'scale(1.1)' }}
    >
      <Box width='4rem' height='4rem' borderRadius='full' border='2px solid #4ad0ed'>
        <Flex alignItems='center' justifyContent='center' width='full' height='full'>
          {React.createElement(icon, { style: { color: textColor, fontSize: '30px' } })}
        </Flex>
      </Box>
      <Text textAlign='center' fontSize={{ base: '12px', md: '14px', lg: '17px' }}>
        {title}
      </Text>
    </Flex>
  );
};

export default Interest;
