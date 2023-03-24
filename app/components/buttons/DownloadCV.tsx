import { Link } from '@remix-run/react';
import { HiDownload } from 'react-icons/hi';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const DownloadCv = () => {
  const { i18n, t } = useTranslation();
  const spanishResume =
    'https://drive.google.com/file/d/1bRU5FqLhiBJ6ftKpX14cFPttXLtd0nuq/view?usp=share_link';
  const englishResume =
    'https://drive.google.com/file/d/1XgMZAm1TPJCxvHMhOORjtB9-WFdpBcmJ/view?usp=share_link';

  const textColor = useColorModeValue('darkbluer', 'ghostwhiter');

  return (
    <Link
      to={i18n.language === 'en' ? englishResume : spanishResume}
      target='_blank'
      style={{ display: 'block', width: 'fit-content', margin: '0 auto' }}
    >
      <Flex
        justifyContent='center'
        alignItems='center'
        border='2px solid #4ad0ed'
        rounded='full'
        width='full'
        textColor={textColor}
        _hover={{ textColor: 'white', backgroundColor: 'lightbluer' }}
        gap={2}
        padding={'2px 8px'}
        marginTop='10px'
        transition={'all 0.3s ease'}
        fontSize='sm'
      >
        {t('home.download')} <HiDownload />
      </Flex>
    </Link>
  );
};

export default DownloadCv;
