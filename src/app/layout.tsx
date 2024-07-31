import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'Historical World Map',
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className="bg-slate-950 text-white"
        style={{
          fontFamily: [
            inter.style.fontFamily,
            notoSansJP.style.fontFamily,
          ].join(','),
        }}
      >
        {children}
      </body>
    </html>
  );
}
