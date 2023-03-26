import { renderToString } from 'react-dom/server';
import { CacheProvider } from '@emotion/react';
import { renderToPipeableStream } from 'react-dom/server';
import createEmotionServer from '@emotion/server/create-instance';
import { RemixServer } from '@remix-run/react';
import type { EntryContext } from '@remix-run/node'; // Depends on the runtime you choose
import isbot from 'isbot';
import i18n from './i18n'; // your i18n configuration file
import i18next from './i18next.server';
import { PassThrough } from 'stream';
import { ServerStyleContext } from './context';
import createEmotionCache from './createEmotionCache';
import { createInstance } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import Backend from 'i18next-fs-backend';
import { resolve } from 'node:path';

const ABORT_DELAY = 5000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  let callbackName = isbot(request.headers.get('user-agent')) ? 'onAllReady' : 'onShellReady';
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);
  let instance = createInstance();
  let lng = await i18next.getLocale(request);
  let ns = i18next.getRouteNamespaces(remixContext);

  await instance
    .use(initReactI18next) // Tell our instance to use react-i18next
    .use(Backend) // Setup our backend
    .init({
      ...i18n, // spread the configuration
      lng, // The locale we detected above
      ns, // The namespaces the routes about to render wants to use
      backend: { loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json') },
    });

  const html = renderToString(
    <ServerStyleContext.Provider value={null}>
      <CacheProvider value={cache}>
        <RemixServer context={remixContext} url={request.url} />
      </CacheProvider>
    </ServerStyleContext.Provider>
  );

  const chunks = extractCriticalToChunks(html);

  const markup = renderToString(
    <ServerStyleContext.Provider value={chunks.styles}>
      <CacheProvider value={cache}>
        <RemixServer context={remixContext} url={request.url} />
      </CacheProvider>
    </ServerStyleContext.Provider>
  );

  return new Promise((resolve, reject) => {
    let { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <RemixServer context={remixContext} url={request.url} />
      </I18nextProvider>,
      {
        [callbackName]: () => {
          let body = new PassThrough();

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(`<!DOCTYPE html>${markup}`, {
              status: responseStatusCode,
              headers: responseHeaders,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
