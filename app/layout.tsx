import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fadehouse Barbershop',
  description: 'Precision without compromise. Book your Fadehouse appointment.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0B0B0A] text-[#F2F0E9] antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
