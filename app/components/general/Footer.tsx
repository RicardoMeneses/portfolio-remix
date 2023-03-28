import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Link } from '@remix-run/react';
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

const Footer = () => {
  const { t } = useTranslation();
  const backgroundColor = useColorModeValue('#051139', '#fff');
  const textColor = useColorModeValue('#fff', '#051139');
  return (
    <footer>
      <Flex
        position='relative'
        direction={{ base: 'column', md: 'row' }}
        backgroundColor={backgroundColor}
        gap={5}
        paddingX={{ base: 10, md: 20 }}
        alignItems='center'
        justifyContent='space-between'
        textColor={textColor}
        paddingY={8}
        marginTop={10}
      >
        <Text
          textAlign={{ base: 'center', md: 'left' }}
          marginBottom={{ base: 3, md: 0 }}
          order={{ base: 2, md: 1 }}
        >
          {t('footer.made')} <span>Ricardo Meneses ©️ 2023</span>
        </Text>
        <Flex alignItems='center' gap={{ base: 3, md: 10 }} order={{ md: 2 }}>
          <Link to='https://github.com/RicardoMeneses' target='_blank'>
            <FaGithub fontSize='28px' color={textColor} />
          </Link>
          <Link to='https://www.linkedin.com/in/ricardo-meneses-morales/' target='_blank'>
            <FaLinkedin fontSize='28px' color={textColor} />
          </Link>
        </Flex>
      </Flex>
    </footer>
  );
};

export default Footer;
