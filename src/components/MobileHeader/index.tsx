import React from 'react';

import { useMst } from '../../store/store';

import s from './MobileHeader.module.scss';

import { ReactComponent as Logo } from '../../assets/img/icons/logo.svg';

const MobileHeader: React.FC = () => {
  const { mobileMenu } = useMst();

  return (
    <div className={s.header}>
      <button onClick={() => mobileMenu.toogleMobileMenu()} type="button" className={s.burger}>
        menuF
      </button>
      <div className={s.logo}>
        <div className={s.logo_icon}>
          <Logo width="20px" height="23px" />
        </div>
        <div className={s.logo_text}>
          less<span>tools</span>
        </div>
      </div>
      <div />
    </div>
  );
};

export default MobileHeader;
