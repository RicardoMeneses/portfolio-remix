import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

interface InterestsProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
}

const Interests: React.FC<InterestsProps> = ({ icon, title }) => {
  const textColor = useColorModeValue('#051139', '#fff');
  return (
    <Flex
      transition='all 0.3s ease'
      _hover={{ transform: 'scale(1.1)' }}
      direction='column'
      gap={3}
      justifyContent='center'
      alignItems='center'
    >
      <Flex
        width='8rem'
        height='8rem'
        border='3px solid #4ad0ed'
        borderRadius='full'
        justifyContent='center'
        alignItems='center'
      >
        {React.createElement(icon, { style: { color: textColor, fontSize: '3rem' } })}
      </Flex>
      <Text textColor={textColor} _hover={{ cursor: 'default' }}>
        {title}
      </Text>
    </Flex>
  );
};

export default Interests;
