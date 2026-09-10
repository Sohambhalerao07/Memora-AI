// src/app/layout.jsx
import '../index.css';
import { TenantProvider } from '@/context/TenantContext';

export const metadata = {
  title: 'Memora-AI — Multi-Tenant AI Event Photo Platform',
  description: 'AI-powered face discovery for weddings, corporate events, and conferences. Scan, take a selfie, and find yourself.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-[#0A0A0B] text-[#FAFAFA]">
      <body className="min-h-full flex flex-col font-sans antialiased selection:bg-neutral-800 selection:text-white">
        <TenantProvider>
          {children}
        </TenantProvider>
      </body>
    </html>
  );
}
