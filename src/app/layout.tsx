import type { Metadata } from 'next';
import './globals.css';
import { DistrictProvider } from '@/context/DistrictContext';

export const metadata: Metadata = {
  title: 'SKYFALL | Movies, Live Events, Dining & Passes',
  description: 'Your city’s ultimate going-out companion: book cinema tickets with seat selection, concert passes, dining tables with Skyfall Pay discounts, and digital pass wallet.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-full flex flex-col bg-[#090C12] text-slate-100 selection:bg-[#E23744] selection:text-white antialiased">
        <DistrictProvider>
          {children}
        </DistrictProvider>
      </body>
    </html>
  );
}
