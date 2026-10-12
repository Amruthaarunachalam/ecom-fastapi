import type { Metadata } from 'next';
import { Providers } from './components/themeprovider';
import './globals.css';

export const metadata: Metadata = {
  title: 'E-Commerce Dashboard',
  description: 'FastAPI & Next.js Management System',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body><Providers>{children}
        </Providers>
      </body>
      
    </html>
  );
}