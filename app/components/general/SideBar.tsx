import { FaBriefcase, FaHome, FaIdCard, FaUser, FaWindowClose } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { Link } from '@remix-run/react';

interface SideBarProps {
  openMenu: boolean;
  handleOpen: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ openMenu, handleOpen }) => {
  const { t } = useTranslation();

  const backgroundColor = useColorModeValue('#051139cc', '#ffffff90');
  const textColor = useColorModeValue('#fff', '#051139');

  const handleClickScroll = (id: string) => {
    const element = document.getElementById(id);
    handleOpen();
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      as='aside'
      position='fixed'
      width='75%'
      backgroundColor={backgroundColor}
      height='100vh'
      top={0}
      left={0}
      transition='all 0.3s ease-in-out'
      transform={openMenu ? 'translate(0)' : 'translate(-100%)'}
    >
      <FaWindowClose
        color={textColor}
        style={{ position: 'absolute', top: 4, right: 3, fontSize: '18px', cursor: 'pointer' }}
        onClick={handleOpen}
      />
      <Flex direction='column' gap={3} marginTop={20} textAlign='center' fontSize='20px'>
        <Text
          id='homeLink'
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: textColor,
            alignItems: 'center',
            fontSize: '18px',
            padding: '10px 0',
          }}
          onClick={() => handleClickScroll('home')}
        >
          <FaHome fontSize='18px' />
          {t('header.home')}
        </Text>
        <Text
          id='aboutMeLink'
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: textColor,
            alignItems: 'center',
            fontSize: '18px',
            padding: '10px 0',
          }}
          onClick={() => handleClickScroll('aboutMe')}
        >
          <FaUser fontSize='18px' />
          {t('header.about')}
        </Text>
        <Text
          id='projectsLink'
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: textColor,
            alignItems: 'center',
            fontSize: '18px',
            padding: '10px 0',
          }}
          onClick={() => handleClickScroll('projects')}
        >
          <FaBriefcase fontSize='18px' />
          {t('header.projects')}
        </Text>
        <Text
          id='resumeLink'
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: textColor,
            alignItems: 'center',
            fontSize: '18px',
            padding: '10px 0',
          }}
          onClick={() => handleClickScroll('resume')}
        >
          <FaIdCard fontSize='18px' />
          {t('header.resume')}
        </Text>
      </Flex>
    </Box>
  );
};

export default SideBar;
