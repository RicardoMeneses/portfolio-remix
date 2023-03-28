import {
  Flex,
  Heading,
  IconButton,
  Text,
  Icon,
  useColorMode,
  useColorModeValue,
  Hide,
  Show,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';
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
      <Flex
        width='full'
        paddingY={4}
        paddingX={{ base: 10, md: 10, lg: 20 }}
        justifyContent='space-between'
      >
        <Heading as='h1' size='lg' color='lightbluer'>
          Ricardo
        </Heading>
        <Hide below='md'>
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
        </Hide>
        <Show below='md'>
          <Flex textColor='#fff' gap={5} alignItems='center'>
            <IconButton
              aria-label='Theme icon'
              color={navbar ? textColor : 'white'}
              backgroundColor='transparent'
              icon={colorMode === 'dark' ? <Icon as={FaSun} /> : <Icon as={FaMoon} />}
              onClick={toggleColorMode}
            />
            <Flex justifyContent='center' alignItems='center' cursor='pointer'>
              <MenuLanguage language={i18n.language} navbar={navbar}>
                {i18n.language !== 'es' && (
                  <MenuItem onClick={() => changeLanguage('es')}>Español</MenuItem>
                )}
                {i18n.language !== 'en' && (
                  <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
                )}
              </MenuLanguage>
            </Flex>
            <FaBars color={navbar ? textColor : 'white'} fontSize='20px' />
          </Flex>
        </Show>
      </Flex>
    </header>
  );
};

export default Header;
