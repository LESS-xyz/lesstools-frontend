import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

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

interface ILinkProps {
  imgDark: string;
  imgWhite: string;
  text: string;
  to?: string;
}

const LinkSidebar: React.FC<ILinkProps> = ({ imgDark, text, imgWhite, to }) => {
  const [isHover, setIsHover] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    if (to && loc.pathname.includes(to.slice(0, 8))) {
      setIsHover(true);
    } else setIsHover(false);
  }, [loc, to]);

  if (to)
    return (
      <NavLink
        activeClassName={s.link_active}
        isActive={() => loc.pathname.includes(to.slice(0, 8))}
        to={to}
      >
        <div
          className={s.link}
          onBlur={() => setIsHover(loc.pathname.includes(to.slice(0, 8)))}
          onMouseOut={() => setIsHover(loc.pathname.includes(to.slice(0, 8)))}
          onFocus={() => setIsHover(true)}
          onMouseOver={() => setIsHover(true)}
        >
          <div className={s.link_img}>
            <img src={isHover ? imgWhite : imgDark} alt="img" />
          </div>
          <div className={s.link_text}>{text}</div>
        </div>
      </NavLink>
    );

  return (
    <div
      className={s.link}
      onBlur={() => setIsHover(false)}
      onMouseOut={() => setIsHover(false)}
      onFocus={() => setIsHover(true)}
      onMouseOver={() => setIsHover(true)}
    >
      <div className={s.link_img}>
        <img src={isHover ? imgWhite : imgDark} alt="img" />
      </div>
      <div className={s.link_text}>{text}</div>
    </div>
  );
};

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
      <LinkSidebar imgDark={board} imgWhite={board} to="/board" text="LessBoard" />
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
          to="/live-new-pairs"
          text="Live New Pairs"
        />
        <LinkSidebar
          imgDark={pair}
          imgWhite={pairWhite}
          to="/pair-explorer/0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974"
          text="Pair Explorer"
        />
        <LinkSidebar
          imgDark={bigSwap}
          imgWhite={bigSwapWhite}
          to="/big-swap-explorer"
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
        <LinkSidebar imgDark={live} imgWhite={liveWhite} text="Live New Pairs" />
        <LinkSidebar imgDark={pair} imgWhite={pairWhite} text="Pair Explorer" />
        <LinkSidebar imgDark={bigSwap} imgWhite={bigSwapWhite} text="Big Swap Explorer" />
      </div>
      <div className={s.group}>
        <div className={s.subtitle}>common</div>
        <LinkSidebar imgDark={bot} imgWhite={botWhite} text="New Pairs Bot" />
      </div>
      <div className={s.subtitle}>others</div>
      <LinkSidebar
        to="/user-account"
        imgDark={account}
        imgWhite={accountWhite}
        text="User Account"
      />
    </aside>
  );
};

export default Sidebar;
