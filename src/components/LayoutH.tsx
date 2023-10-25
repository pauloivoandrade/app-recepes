import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function LayoutH() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
