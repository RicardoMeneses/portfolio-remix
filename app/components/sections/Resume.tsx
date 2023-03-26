import { useTranslation } from 'react-i18next';
import { BsGearFill } from 'react-icons/bs';
import {
  FaAws,
  FaBootstrap,
  FaComment,
  FaCss3Alt,
  FaGithubSquare,
  FaHtml5,
  FaNodeJs,
  FaPeopleArrows,
  FaShopify,
  FaWordpress,
} from 'react-icons/fa';
import { RiReactjsFill, RiTeamFill, RiVuejsLine } from 'react-icons/ri';
import { TbBrandNextjs } from 'react-icons/tb';
import {
  SiBitbucket,
  SiNestjs,
  SiNuxtdotjs,
  SiPrisma,
  SiRemix,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { DiMongodb } from 'react-icons/di';
import { IoLogoJavascript } from 'react-icons/io';
import TechnicalSkill from '../cards/TechnicalSkill';
import SoftSkill from '../cards/SoftSkill';
import { Flex, Grid, GridItem, Heading, useColorMode, useColorModeValue } from '@chakra-ui/react';
import Experience from '../cards/Experience';

const Resume = () => {
  const { t } = useTranslation();
  const textColor = useColorModeValue('#051139', '#fff');
  const { colorMode } = useColorMode();
  const softSkills = [
    {
      icon: FaComment,
      text: t('resume.communication'),
    },
    {
      icon: FaPeopleArrows,
      text: t('resume.teamwork'),
    },
    {
      icon: BsGearFill,
      text: t('resume.adaptability'),
    },
    {
      icon: RiTeamFill,
      text: t('resume.leadership'),
    },
  ];

  const technicalSkills = [
    {
      icon: RiReactjsFill,
      text: 'ReactJS',
      outline: '#5ED2F3',
      bgHover: '#5ed3f390',
      textColor: '#5ED2F3',
    },
    {
      icon: TbBrandNextjs,
      text: 'NextJs',
      outline: '#5ED2F3',
      bgHover: '#5ED2F390',
      textColor: '#5ED2F3',
    },
    {
      icon: RiVuejsLine,
      text: 'VueJS',
      outline: '#3EB27F',
      bgHover: '#3EB27F90',
      textColor: '#3EB27F',
    },
    {
      icon: SiNuxtdotjs,
      text: 'NuxtJs',
      outline: `${colorMode === 'light' ? '#2D465B' : '#3EB27F'}`,
      bgHover: `${colorMode === 'light' ? '#2D465B90' : '#3EB27F90'}`,
      textColor: `${colorMode === 'light' ? '#2D465B' : '#3EB27F'}`,
    },
    {
      icon: FaNodeJs,
      text: 'NodeJS',
      outline: '#68A063',
      bgHover: '#68A06390',
      textColor: '#68A063',
    },
    {
      icon: FaAws,
      text: 'AWS',
      outline: '#F69400',
      bgHover: '#F6940090',
      textColor: '#F69400',
    },
    {
      icon: FaShopify,
      text: 'Shopify',
      outline: '#91B944',
      bgHover: '#91B94490',
      textColor: '#91B944',
    },
    {
      icon: FaWordpress,
      text: 'Wordpress',
      outline: '#207095',
      bgHover: '#20709590',
      textColor: '#207095',
    },
    {
      icon: FaBootstrap,
      text: 'Bootstrap',
      outline: '#6C0FED',
      bgHover: '#6C0FED90',
      textColor: '#6C0FED',
    },
    {
      icon: DiMongodb,
      text: 'MongoDB',
      outline: '#3F9043',
      bgHover: '#3F904390',
      textColor: '#3F9043',
    },
    {
      icon: FaGithubSquare,
      text: 'Github',
      outline: `${colorMode === 'light' ? '#000' : '#fff'}`,
      bgHover: `${colorMode === 'light' ? '#00000090' : '#ffffff90'}`,
      textColor,
    },
    {
      icon: FaHtml5,
      text: 'Html5',
      outline: '#F7491D',
      bgHover: '#F7491D90',
      textColor: '#F7491D',
    },
    {
      icon: FaCss3Alt,
      text: 'Css3',
      outline: '#3495CF',
      bgHover: '#3495CF90',
      textColor: '#3495CF',
    },
    {
      icon: IoLogoJavascript,
      text: 'JS',
      outline: '#EFD81A',
      bgHover: '#EFD81A90',
      textColor: '#EFD81A',
    },
    {
      icon: SiTailwindcss,
      text: 'Tailwind CSS',
      outline: '#05AFCD',
      bgHover: '#05AFCD90',
      textColor: '#05AFCD',
    },
    {
      icon: SiTypescript,
      text: 'TypeScript',
      outline: '#2F73BF',
      bgHover: '#2F73BF90',
      textColor: '#2F73BF',
    },
    {
      icon: SiNestjs,
      text: 'NestJs',
      outline: '#D9214B',
      bgHover: '#D9214B90',
      textColor: '#D9214B',
    },
    {
      icon: SiBitbucket,
      text: 'Bitbucket',
      outline: '#2680F6',
      bgHover: '#2680F690',
      textColor: '#2680F6',
    },
    {
      icon: SiRemix,
      text: 'Remix',
      outline: `${colorMode === 'light' ? '#000' : '#fff'}`,
      bgHover: `${colorMode === 'light' ? '#00000090' : '#ffffff90'}`,
      textColor,
    },
    {
      icon: SiPrisma,
      text: 'Prisma',
      outline: `${colorMode === 'light' ? '#000' : '#fff'}`,
      bgHover: `${colorMode === 'light' ? '#00000090' : '#ffffff90'}`,
      textColor,
    },
  ];

  const education = [
    {
      years: '2013-2019',
      title: 'Escuela Superior de Cómputo (ESCOM-IPN)',
      description: t('resume.engineer'),
    },
    {
      years: '2018',
      title: 'DevF',
      description: t('resume.red'),
    },
    {
      years: '2018',
      title: 'DevF',
      description: t('resume.black'),
    },
  ];

  const labor = [
    {
      years: t('resume.freelanceDate'),
      title: t('resume.freelance'),
      description: t('resume.freelanceDescription'),
    },
    {
      years: t('resume.raccoonDate'),
      title: t('home.developer'),
      name: 'Raccoon Studio',
      description: t('resume.raccoon'),
    },
    {
      years: t('resume.seoDate'),
      title: t('resume.seo'),
      name: 'Sube Agencia Digital',
      description: t('resume.seoDescription'),
    },
  ];

  return (
    <section id='resume' style={{ marginTop: '50px' }}>
      <Heading as='h1' fontWeight={700} fontSize='5xl' textAlign='center' textColor={textColor}>
        {t('resume.experience')}
      </Heading>
      <Flex direction={{ base: 'column', md: 'row' }} gap={4} marginY={10}>
        <Experience type='school' items={education} />
        <Experience type='work' items={labor} />
      </Flex>
      <Heading as='h1' fontWeight={700} fontSize='5xl' textAlign='center' textColor={textColor}>
        {t('resume.technicalSkills')}
      </Heading>

      <Grid
        gap={5}
        marginTop={10}
        templateColumns={{
          base: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(6, 1fr)',
        }}
        justifyContent={'center'}
        alignItems='center'
      >
        {technicalSkills.map((skill) => (
          <GridItem key={skill.text}>
            <TechnicalSkill
              key={skill.text}
              outline={skill.outline}
              bgHover={skill.bgHover}
              textColor={skill.textColor}
              text={skill.text}
              icon={skill.icon}
            />
          </GridItem>
        ))}
      </Grid>

      <Heading
        as='h1'
        fontWeight={700}
        fontSize='5xl'
        textAlign='center'
        textColor={textColor}
        marginTop={10}
      >
        {t('resume.softSkills')}
      </Heading>

      <Grid
        gap={5}
        marginTop={10}
        templateColumns={{
          base: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        justifyContent={'center'}
        alignItems='center'
      >
        {softSkills.map((softSkill) => (
          <GridItem key={softSkill.text}>
            <SoftSkill key={softSkill.text} icon={softSkill.icon} title={softSkill.text} />
          </GridItem>
        ))}
      </Grid>
    </section>
  );
};

export default Resume;
