import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Menu, MenuButton } from '@szhsin/react-menu';

import { FaChevronDown } from 'react-icons/fa';

interface MenuLanguageProps {
  children: React.ReactNode;
  language: string;
  navbar?: boolean;
}

const MenuLanguage: React.FC<MenuLanguageProps> = ({ children, language, navbar }) => {
  const textColor = useColorModeValue('#fff', '#051139cc');
  return (
    <Menu
      menuButton={
        <MenuButton>
          <Flex alignItems='center' gap={1} textColor={navbar ? textColor : 'white'}>
            <span style={{ color: `${navbar ? textColor : 'white'}` }}>{language}</span>
            <FaChevronDown style={{ fontSize: '12px' }} />
          </Flex>
        </MenuButton>
      }
      transition
      direction='bottom'
      align='end'
      position='anchor'
      viewScroll='close'
      arrow={true}
    >
      {children}
    </Menu>
  );
};

export default MenuLanguage;
