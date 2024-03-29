import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'ar-EG'],

    // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
    defaultLocale: 'ar-EG',
    localePrefix: 'never'

});

export const config = {
    // Skip all paths that should not be internationalized. This example skips
    // certain folders and all pathnames with a dot (e.g. favicon.ico)
    matcher: ['/((?!_next|_vercel|.*\\..*).*)']
};