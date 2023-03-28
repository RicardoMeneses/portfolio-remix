import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

interface TechnicalSkillProps {
  textColor: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  outline: string;
  bgHover: string;
}

const TechnicalSkill: React.FC<TechnicalSkillProps> = ({
  textColor,
  icon,
  text,
  outline,
  bgHover,
}) => {
  return (
    <Flex
      direction='column'
      role='group'
      gap={3}
      justifyContent='center'
      alignItems='center'
      transition='all 0.3s ease'
      _hover={{ transform: 'scale(1.1)' }}
    >
      <Flex
        height='7rem'
        width='7rem'
        borderRadius='full'
        justifyContent='center'
        alignItems='center'
        transition='all 0.3s ease'
        _groupHover={{ backgroundColor: bgHover }}
        border={`2px solid ${outline}`}
      >
        {React.createElement(icon, { style: { color: textColor, fontSize: '3rem' } })}
      </Flex>
      <Text textColor={textColor} fontSize='2xl' _hover={{ cursor: 'default' }}>
        {text}
      </Text>
    </Flex>
  );
};

export default TechnicalSkill;
