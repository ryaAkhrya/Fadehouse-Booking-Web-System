import type { Metadata } from 'next';
import { Outfit, Manrope } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@/lib/i18n';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Fadehouse Barbershop',
  description: 'Precision without compromise. Book your Fadehouse appointment.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { lang } = await getDictionary();

  return (
    <html lang={lang} className={cn(outfit.variable, manrope.variable)}>
      <body className="bg-background text-foreground font-sans antialiased selection:bg-accent/30 selection:text-foreground">
        <LanguageProvider initialLang={lang}>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-surface focus:text-accent">
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
