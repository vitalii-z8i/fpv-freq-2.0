import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FPV Freq",
  description: "Калькулятор конфліктів частот для FPV",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/icon.png',
        href: '/images/icon.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/icon-dark.png',
        href: '/images/icon-dark.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        url: '/images/favicon-96x96.png',
        sizes: '96x96',
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        url: '/images/favicon.svg',
      },
      {
        rel: 'shortcut icon',
        url: '/images/favicon.ico',
      },
    ],
    apple: {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/images/apple-touch-icon.png',
    },
  },
  robots: 'index, follow',
  appleWebApp: {
    capable: true,
    title: "FPVFreq",
    statusBarStyle: "black-translucent"
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1F2937" },
    { media: "(prefers-color-scheme: light)", color: "#F9FAFB" },
  ],
}

import Nav from './components/nav/nav'
import NavItem from "./components/nav/nav-item";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Nav>
          <>
            <NavItem href="/">Вибір Каналу</NavItem>
            <NavItem href="/table">Таблиця Каналів</NavItem>
          </>
        </Nav>
        <div className="max-w-screen-xl mx-auto px-4 py-8 mb-6">
          {children}
        </div>
        <footer className="z-10 bg-inherit fixed bottom-0 right-0 rounded-tl-md border-black dark:border-white border-t border-l py-1 px-2">Розробив - Друг Портер 🍺</footer>
      </body>
    </html>
  );
}
