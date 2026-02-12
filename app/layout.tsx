import type { Metadata } from 'next';
import Script from 'next/script';

import NavBar from '@/components/NavBar';

import './globals.css';

export const metadata: Metadata = {
  title: "Valentine's Queen",
  description: 'Vote and crown the Valentine\'s Queen.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-light text-slate-900 antialiased selection:bg-primary selection:text-white">
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        <Script id="tailwind-config" strategy="beforeInteractive">
          {`tailwind.config = {
            theme: {
              extend: {
                colors: {
                  primary: '#ee2b6c',
                  'primary-hover': '#d61a5c',
                  'bg-light': '#f8f6f6',
                  'bg-dark': '#221016'
                },
                fontFamily: {
                  serif: ['"Playfair Display"', 'serif'],
                  sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                  display: ['"Plus Jakarta Sans"', 'sans-serif']
                },
                boxShadow: {
                  soft: '0 10px 40px -10px rgba(238, 43, 108, 0.1)',
                  glow: '0 0 20px rgba(238, 43, 108, 0.3)'
                }
              }
            }
          };`}
        </Script>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
