import type { Metadata } from 'next'
import { Alexandria as Font  } from 'next/font/google'
import '../globals.css'
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ThemeProvider } from "@/app/components/theme-provider"
import { cn } from "@/lib/utils"
import ThemeCustomSwitch from '../components/theme-custom-switch';
import LocaleSwitch from '../components/locale-switch';
import MahmoudAbdelazizLogo from '../components/mahmoud-abdelaziz-logo';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
const font = Font({ subsets: ['latin'], variable: '--font-base' })

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode,
  params: { locale: string }
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {

    notFound();
  }

  return (
    <html lang={locale} dir={locale === 'ar-EG' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-base antialiased",
          font.variable
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <header className='container flex mx-auto border-b shadow-md drop-shadow-md'>
              <div className="flex items-center justify-between w-full gap-2">
                <span className="inline-flex items-center gap-2">
                <MahmoudAbdelazizLogo width={30} tooltipContent={'Mahmoud Abdelaziz Salama'} />
                <h4 className='hidden text-sm font-bold md:inline'>Mahmoud Abdelaziz</h4>
                </span>
                
                <div className="flex items-center gap-2">
                  <ThemeCustomSwitch />
                  <LocaleSwitch locale={locale} />
                </div>

              </div>
            </header>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
