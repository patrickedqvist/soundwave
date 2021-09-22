import { FC } from 'react';

import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

import s from './Layout.module.scss';

const Layout: FC = ({ children }) => {
  return (
    <div className={s.root}>
      <Header />
        <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
