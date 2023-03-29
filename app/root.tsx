import { withEmotionCache } from '@emotion/react';
import type { MetaFunction, LinksFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { useContext, useEffect, useMemo } from 'react';
import { ServerStyleContext, ClientStyleContext } from './context';
import { extendTheme, ChakraProvider, cookieStorageManagerSSR } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import i18next from './i18next.server';
import mainStyles from '~/styles/main.css';

const colors = {
  darkbluer: '#051139',
  lightbluer: '#4ad0ed',
  ghostwhiter: '#d2d6e6',
  white: '#ffffff',
  black: '#000000',
  general: '#182147',
};
const theme = extendTheme({ colors, fonts: { body: "'Source Code Pro', monospace;" } });

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Ricardo Meneses Morales',
  viewport: 'width=device-width,initial-scale=1',
  keywords: 'Desarrollador Web, Full Stack, Front-End, Back-End',
  author: 'Ricardo Meneses Morales',
  description:
    'Desarrollador Web con más de tres años de experiencia en Full Stack con JavaScript / ReactJS / VueJS / NodeJS / MongoDB',
  'og:url': 'https://soyricardom.com/',
  'og:type': 'website',
  'og:title': 'Ricardo Meneses Morales',
  'og:description':
    'Desarrollador Web con más de tres años de experiencia en Full Stack con JavaScript / ReactJS / VueJS / NodeJS / MongoDB',
  'og:image': 'http://soyricardom.com/img/logo_.png',
  'twitter:card': 'summary_large_image',
  'twitter:title': 'Ricardo Meneses Morales',
  'twitter:description':
    'Desarrollador Web con más de tres años de experiencia en Full Stack con JavaScript / ReactJS / VueJS / NodeJS / MongoDB',
});

export let links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@600;700&display=swap',
    },
    {
      rel: 'stylesheet',
      href: mainStyles,
    },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
    { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
    { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
    { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
    { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
    { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' },
    { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' },
    { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/manifest.json' },
  ];
};

interface DocumentProps {
  children: React.ReactNode;
}

// This will return cookies
export const loader: LoaderFunction = async ({ request }) => {
  let locale = await i18next.getLocale(request);
  return json({ cookies: request.headers.get('cookie') ?? '', locale });
};

export let handle = {
  i18n: 'common',
};

export function useChangeLanguage(locale: string) {
  let { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);
}

const Document = withEmotionCache(({ children }: DocumentProps, emotionCache) => {
  const serverStyleData = useContext(ServerStyleContext);
  const clientStyleData = useContext(ClientStyleContext);

  function getColorMode(cookies: string) {
    const match = cookies.match(new RegExp(`(^| )${CHAKRA_COOKIE_COLOR_KEY}=([^;]+)`));
    return match == null ? void 0 : match[2];
  }

  // here we can set the default color mode. If we set it to null,
  // there's no way for us to know what is the the user's preferred theme
  // so the cient will have to figure out and maybe there'll be a flash the first time the user visits us.
  const DEFAULT_COLOR_MODE: 'dark' | 'light' | null = 'dark';

  const CHAKRA_COOKIE_COLOR_KEY = 'chakra-ui-color-mode';

  let { cookies, locale } = useLoaderData();
  let { i18n } = useTranslation();

  // the client get the cookies from the document
  // because when we do a client routing, the loader can have stored an outdated value
  if (typeof document !== 'undefined') {
    cookies = document.cookie;
  }

  // get and store the color mode from the cookies.
  // It'll update the cookies if there isn't any and we have set a default value
  let colorMode = useMemo(() => {
    let color = getColorMode(cookies);

    if (!color && DEFAULT_COLOR_MODE) {
      cookies += `${CHAKRA_COOKIE_COLOR_KEY}=${DEFAULT_COLOR_MODE}`;
      color = DEFAULT_COLOR_MODE;
    }

    return color;
  }, [cookies]);

  useChangeLanguage(locale);

  // Only executed on client
  useEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head;
    // re-inject tags
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      (emotionCache.sheet as any)._insertTag(tag);
    });
    // reset cache to reapply global styles
    clientStyleData?.reset();
  }, []);

  return (
    <html
      lang={i18n.language}
      dir={i18n.dir()}
      {...(colorMode && {
        'data-theme': colorMode,
        style: { colorScheme: colorMode },
      })}
    >
      <head>
        <Meta />
        <Links />
        {serverStyleData?.map(({ key, ids, css }) => (
          <style
            key={key}
            data-emotion={`${key} ${ids.join(' ')}`}
            dangerouslySetInnerHTML={{ __html: css }}
          />
        ))}
      </head>
      <body
        {...(colorMode && {
          className: `chakra-ui-${colorMode}`,
        })}
      >
        <div className='stelle bianche'></div>
        <div className='stelle giganti'></div>
        <ChakraProvider colorModeManager={cookieStorageManagerSSR(cookies)} theme={theme}>
          {children}
        </ChakraProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload port={Number(process.env.PORT) || 3000} />
      </body>
    </html>
  );
});

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
