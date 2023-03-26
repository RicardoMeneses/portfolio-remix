import { Heading, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Project from '../cards/Project';

const Projects = () => {
  const { t } = useTranslation();
  const textColor = useColorModeValue('#051139', '#fff');

  const projects = [
    {
      title: 'RaccoonDev Studio',
      link: 'https://raccoondev.studio/',
      img: '/img/RaccoonDev.webp',
      tech: 'NextJS / ReactJS / NodeJS / Bootstrap',
      description: t('projects.raccoon'),
    },
    {
      title: 'Oleum Vitae',
      link: 'https://oleumvitae.com.mx/',
      img: '/img/OleumVitae.webp',
      tech: 'NuxtJS / VueJS / Shopify / NodeJS / Bootstrap',
      description: t('projects.oleum'),
    },
    {
      title: 'Crepini',
      link: 'https://crepiniplantbased.com/',
      img: '/img/Crepini.webp',
      tech: 'NuxtJS / VueJS / Worpdress / NodeJS / Vuetify / Paypal',
      description: t('projects.crepini'),
    },
  ];
  return (
    <section id='projects' style={{ marginTop: '50px' }}>
      <Heading as='h1' fontWeight={700} fontSize='5xl' textAlign='center' textColor={textColor}>
        {t('projects.title')}
      </Heading>
      {projects.map((project, index) => (
        <Project key={project.title} project={project} index={index} />
      ))}
    </section>
  );
};

export default Projects;
