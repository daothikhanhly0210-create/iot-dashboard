import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export const metadata: Metadata = {
  title: 'IoT Monitor',
  description: 'IoT Dashboard with Deep Dark Theme',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="bg-slate-950 text-slate-200" suppressHydrationWarning>
      <body className="min-h-screen">
        <div className="flex flex-col min-h-screen">
          <Topbar />
          <div className="flex flex-1" style={{ overflow: 'hidden' }}>
            <Sidebar />
            <main className="flex-1 p-6 overflow-y-auto bg-slate-950">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}