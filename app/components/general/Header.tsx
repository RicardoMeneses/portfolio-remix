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

const Header = () => {
  let { i18n, t } = useTranslation();

  const changeLanguage = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
  };

  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = useColorModeValue('darkbluer', 'ghostwhiter');
  return (
    <header
      style={{
        position: 'fixed',
        transition: 'all 0.3s ease-in',
        zIndex: '20',
        width: '100%',
        height: '4rem',
      }}
    >
      <Flex width='full' paddingY={4} paddingX={20} justifyContent='space-between'>
        <Heading as='h1' size='lg' color='lightbluer'>
          Ricardo
        </Heading>
        <Flex gap={9} alignItems='center' textColor={textColor}>
          <Text fontWeight={700} _hover={{ cursor: 'pointer' }}>
            {t('header.home')}
          </Text>
          <Text fontWeight={700} _hover={{ cursor: 'pointer' }}>
            {t('header.about')}
          </Text>
          <Text fontWeight={700} _hover={{ cursor: 'pointer' }}>
            {t('header.projects')}
          </Text>
          <Text fontWeight={700} _hover={{ cursor: 'pointer' }}>
            {t('header.resume')}
          </Text>
          <IconButton
            aria-label='Theme icon'
            icon={colorMode === 'dark' ? <Icon as={FaSun} /> : <Icon as={FaMoon} />}
            onClick={toggleColorMode}
          />
          <MenuLanguage language={i18n.language}>
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
