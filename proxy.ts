import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Next 16 "proxy" (formerly middleware): resolves the locale from the URL
// prefix; "/" (no prefix) redirects to "/fr" or "/en" from the browser language
export default createMiddleware(routing);

export const config = {
  // Every route except API, Next internals and files with an extension
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
