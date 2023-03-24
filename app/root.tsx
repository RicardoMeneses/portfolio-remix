import { withEmotionCache } from '@emotion/react';
import type { MetaFunction, LinksFunction, LoaderFunction } from '@remix-run/node';
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
});

export let links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@600;700&display=swap',
    },
  ];
};

interface DocumentProps {
  children: React.ReactNode;
}

// This will return cookies
export const loader: LoaderFunction = async ({ request }) => {
  return request.headers.get('cookie') ?? '';
};

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

  let cookies = useLoaderData();

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
      lang='es'
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
        <ChakraProvider colorModeManager={cookieStorageManagerSSR(cookies)} theme={theme}>
          {children}
        </ChakraProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
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
