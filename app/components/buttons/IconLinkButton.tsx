import { Link } from 'react-router-dom';
import React from 'react';
import { Flex } from '@chakra-ui/react';

interface LinkButtonProps {
  link: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const IconLinkButton: React.FC<LinkButtonProps> = ({ link, icon }) => {
  return (
    <Link to={link} target='_blank'>
      <Flex
        borderRadius='full'
        border='2px solid #4ad0ed'
        transition='all 0.3s ease'
        alignItems='center'
        justifyContent='center'
        height='40px'
        width='40px'
        _hover={{ textColor: 'white', backgroundColor: 'lightbluer' }}
      >
        {React.createElement(icon, { style: { fontSize: '18px' } })}
      </Flex>
    </Link>
  );
};

export default IconLinkButton;
