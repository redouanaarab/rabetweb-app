// app/(site)/layout.tsx
import Header from '@/components/Header/Header';
import Footer from "@/components/Footer/Footer";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: Readonly<SiteLayoutProps>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
        <main>
          {children}
        </main>
      <Footer />
    </div>
  );
}