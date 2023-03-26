import {
  Flex,
  Heading,
  IconButton,
  Text,
  Icon,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaMoon, FaSun } from 'react-icons/fa';
import MenuLanguage from './MenuLanguage';
import { MenuItem } from '@szhsin/react-menu';
import { useEffect, useState } from 'react';

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  let { i18n, t } = useTranslation();

  const changeLanguage = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
  };

  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue('#fff', '#051139cc');

  const backgroundColor = useColorModeValue('#051139cc', '#fff');

  const handleScroll = () => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        transition: 'all 0.3s ease-in',
        zIndex: '20',
        width: '100%',
        height: '4rem',
        backgroundColor: navbar ? backgroundColor : 'transparent',
      }}
    >
      <Flex width='full' paddingY={4} paddingX={20} justifyContent='space-between'>
        <Heading as='h1' size='lg' color='lightbluer'>
          Ricardo
        </Heading>
        <Flex gap={9} alignItems='center'>
          <Text
            fontWeight={700}
            _hover={{ cursor: 'pointer' }}
            color={navbar ? textColor : 'white'}
          >
            {t('header.home')}
          </Text>
          <Text
            fontWeight={700}
            _hover={{ cursor: 'pointer' }}
            color={navbar ? textColor : 'white'}
          >
            {t('header.about')}
          </Text>
          <Text
            fontWeight={700}
            _hover={{ cursor: 'pointer' }}
            color={navbar ? textColor : 'white'}
          >
            {t('header.projects')}
          </Text>
          <Text
            fontWeight={700}
            _hover={{ cursor: 'pointer' }}
            color={navbar ? textColor : 'white'}
          >
            {t('header.resume')}
          </Text>
          <IconButton
            aria-label='Theme icon'
            color={navbar ? textColor : 'white'}
            backgroundColor='transparent'
            icon={colorMode === 'dark' ? <Icon as={FaSun} /> : <Icon as={FaMoon} />}
            onClick={toggleColorMode}
          />
          <MenuLanguage language={i18n.language} navbar={navbar}>
            {i18n.language !== 'es' && (
              <MenuItem onClick={() => changeLanguage('es')}>Español</MenuItem>
            )}
            {i18n.language !== 'en' && (
              <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
            )}
          </MenuLanguage>
        </Flex>
      </Flex>
    </header>
  );
};

export default Header;
