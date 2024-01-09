import type { Metadata } from 'next'
import { Cairo as Font } from 'next/font/google'
import '../globals.css'
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

const font = Font({ subsets: ['latin'], variable: '--font-base' })
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

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
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
