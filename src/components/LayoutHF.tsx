import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function LayoutHF() {
  return (
    <>
      <Header />
      <Footer />
      <Outlet />
    </>
  );
}
