import { NavLink } from 'react-router-dom';

import LinkSidebar from './LinkSidebar/index';

import s from './Sidebar.module.scss';

import logo from '../../assets/img/sections/sidebar/logo.svg';
import board from '../../assets/img/sections/sidebar/board.svg';
import bot from '../../assets/img/sections/sidebar/bot.svg';
import botWhite from '../../assets/img/sections/sidebar/bot-white.svg';
import account from '../../assets/img/sections/sidebar/account.svg';
import accountWhite from '../../assets/img/sections/sidebar/account-white.svg';
import live from '../../assets/img/sections/sidebar/live.svg';
import liveWhite from '../../assets/img/sections/sidebar/live-white.svg';
import pair from '../../assets/img/sections/sidebar/pair.svg';
import pairWhite from '../../assets/img/sections/sidebar/pair-white.svg';
import bigSwap from '../../assets/img/sections/sidebar/big-swap.svg';
import bigSwapWhite from '../../assets/img/sections/sidebar/big-swap-white.svg';
import uniswap from '../../assets/img/sections/sidebar/uniswap.svg';
import sushiswap from '../../assets/img/sections/sidebar/suchiswap.svg';

const Sidebar: React.FC = () => {
  return (
    <aside className={s.sidebar}>
      <NavLink to="/" className={s.logo}>
        <div className={s.logo_icon}>
          <img src={logo} alt="logo" />
        </div>
        <div className={s.logo_text}>
          less<span>tools</span>
        </div>
      </NavLink>
      <div className={s.subtitle}>LESSBOARD</div>
      <LinkSidebar imgDark={board} imgWhite={board} to="/app" text="LessBoard" />
      <div className={s.group}>
        <div className={s.group_title}>
          <div className={s.group_title__text}>Uniswap</div>
          <div className={s.group_title__icon}>
            <img src={uniswap} alt="img" />
          </div>
        </div>
        <LinkSidebar
          imgDark={live}
          imgWhite={liveWhite}
          to="/app/uniswap/live-new-pairs"
          text="Live New Pairs"
        />
        <LinkSidebar
          imgDark={pair}
          imgWhite={pairWhite}
          to="/app/uniswap/pair-explorer/0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974"
          text="Pair Explorer"
        />
        <LinkSidebar
          imgDark={bigSwap}
          imgWhite={bigSwapWhite}
          to="/app/uniswap/big-swap-explorer"
          text="Big Swap Explorer"
        />
      </div>
      <div className={s.group}>
        <div className={s.group_title}>
          <div className={s.group_title__text}>Sushiswap</div>
          <div className={s.group_title__icon}>
            <img src={sushiswap} alt="img" />
          </div>
        </div>
        <LinkSidebar
          imgDark={live}
          imgWhite={liveWhite}
          text="Live New Pairs"
          to="/app/sushiswap/live-new-pairs"
        />
        <LinkSidebar
          imgDark={pair}
          imgWhite={pairWhite}
          text="Pair Explorer"
          to="/app/sushiswap/pair-explorer/0xc3f279090a47e80990fe3a9c30d24cb117ef91a8"
        />
        <LinkSidebar
          imgDark={bigSwap}
          imgWhite={bigSwapWhite}
          text="Big Swap Explorer"
          to="/app/sushiswap/big-swap-explorer"
        />
      </div>
      <div className={s.group}>
        <div className={s.subtitle}>common</div>
        <LinkSidebar imgDark={bot} imgWhite={botWhite} text="New Pairs Bot" />
      </div>
      <div className={s.subtitle}>others</div>
      <LinkSidebar
        to="/app/user-account"
        imgDark={account}
        imgWhite={accountWhite}
        text="User Account"
      />
    </aside>
  );
};

export default Sidebar;
