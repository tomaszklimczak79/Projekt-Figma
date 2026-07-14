import { ReactNode, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CompareBar } from './components/CompareBar';
import { ToastContainer } from './components/ToastContainer';
import { AppProvider } from './store/AppContext';

interface LayoutProps {
  children: ReactNode;
  pathname: string;
}

function LayoutInner({ children, pathname }: LayoutProps) {
  const prevPath = useRef(pathname);
  useEffect(() => {
    if (prevPath.current !== pathname) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      prevPath.current = pathname;
    }
  }, [pathname]);

  const hideFooter = pathname === '/checkout';

  return (
    <div style={{ fontFamily: "var(--font-sans, 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif)", overflowX: 'hidden' }}>
      <Navbar />
      <main>{children}</main>
      {!hideFooter && <Footer />}
      <CartDrawer />
      <CompareBar />
      <ToastContainer />
    </div>
  );
}

export function Layout({ children, pathname }: LayoutProps) {
  return (
    <AppProvider>
      <LayoutInner pathname={pathname}>{children}</LayoutInner>
    </AppProvider>
  );
}
