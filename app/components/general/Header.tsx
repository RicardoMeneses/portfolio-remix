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
import SideBar from './SideBar';

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
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

  const handleClickScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onScroll = () => {
    let sections = document.querySelectorAll('section');
    let menu = document.querySelectorAll('header p');
    window.onscroll = () => {
      sections.forEach((i) => {
        let top = window.scrollY;
        let offset = i.offsetTop - 150;
        let height = i.offsetHeight;
        let id = i.getAttribute('id');

        if (top >= offset && top < offset + height) {
          menu.forEach((link) => {
            link.classList.remove('activeLink');
            document.querySelector('header p[id*=' + id + ']')?.classList.add('activeLink');
          });
        }
      });
    };
  };

  const handleOpen = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    onScroll();

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
        <Heading
          _hover={{ cursor: 'pointer' }}
          as='h1'
          size='lg'
          color='lightbluer'
          onClick={() => handleClickScroll('home')}
        >
          Ricardo
        </Heading>
        <Hide below='md'>
          <Flex gap={9} alignItems='center'>
            <Text
              id='homeLink'
              fontWeight={700}
              _hover={{ cursor: 'pointer' }}
              color={navbar ? textColor : 'white'}
              onClick={() => handleClickScroll('home')}
            >
              {t('header.home')}
            </Text>
            <Text
              id='aboutMeLink'
              fontWeight={700}
              _hover={{ cursor: 'pointer' }}
              color={navbar ? textColor : 'white'}
              onClick={() => handleClickScroll('aboutMe')}
            >
              {t('header.about')}
            </Text>
            <Text
              id='projectsLink'
              fontWeight={700}
              _hover={{ cursor: 'pointer' }}
              color={navbar ? textColor : 'white'}
              onClick={() => handleClickScroll('projects')}
            >
              {t('header.projects')}
            </Text>
            <Text
              id='resumeLink'
              fontWeight={700}
              _hover={{ cursor: 'pointer' }}
              color={navbar ? textColor : 'white'}
              onClick={() => handleClickScroll('resume')}
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
            <FaBars color={navbar ? textColor : 'white'} fontSize='20px' onClick={handleOpen} />
          </Flex>
        </Show>
        <SideBar openMenu={openMenu} handleOpen={handleOpen} />
      </Flex>
    </header>
  );
};

export default Header;
