import React from 'react';
import Button from '../../../components/Button/index';

import s from './Tool.module.scss';

import uniLogo from '../../../assets/img/sections/board-page/uni-logo.svg';

const Tool: React.FC = React.memo(() => {
  return (
    <section className={s.tool}>
      <div className={s.tool_header}>
        <div className={s.tool_header__img}>
          <img src={uniLogo} alt="uniLogo" />
        </div>
      </div>
      <div className={s.tool_body}>
        <div className={s.tool_body__title}>
          UNISWAP V2 <span>TOOLS</span>
        </div>
        <div className={s.tool_body__buttons}>
          <Button>Live New Pairs</Button>
          <Button>Pair Explorer</Button>
          <Button>Big Swap Explorer</Button>
        </div>
      </div>
    </section>
  );
});

export default Tool;
