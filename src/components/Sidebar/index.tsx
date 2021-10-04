import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Networks } from '../../config/networks';
import LinkSidebar from './LinkSidebar/index';
import { useMst } from '../../store/store';

import s from './Sidebar.module.scss';

import arrowWhite from '../../assets/img/sections/sidebar/arrow-white.svg';
import logo from '../../assets/img/sections/sidebar/logo.svg';
import board from '../../assets/img/sections/sidebar/board.svg';
// import bot from '../../assets/img/sections/sidebar/bot.svg';
// import botWhite from '../../assets/img/sections/sidebar/bot-white.svg';
import account from '../../assets/img/sections/sidebar/account.svg';
import accountWhite from '../../assets/img/sections/sidebar/account-white.svg';
import live from '../../assets/img/sections/sidebar/live.svg';
import liveWhite from '../../assets/img/sections/sidebar/live-white.svg';
import pair from '../../assets/img/sections/sidebar/pair.svg';
import pairWhite from '../../assets/img/sections/sidebar/pair-white.svg';
import bigSwap from '../../assets/img/sections/sidebar/big-swap.svg';
import bigSwapWhite from '../../assets/img/sections/sidebar/big-swap-white.svg';
// import uniswap from '../../assets/img/sections/sidebar/uniswap.svg';
// import sushiswap from '../../assets/img/sections/sidebar/suchiswap.svg';
import ethereum from '../../assets/img/sections/sidebar/ethereum.svg';
import { useState, useCallback } from 'react';

const Sidebar: React.FC = observer(() => {
  const { mobileMenu } = useMst();

  const [activeNetworks, setActiveNetworks] = useState<Networks[]>([Networks.Ethereum]);

  const handleChangeActiveNetwork = (network: Networks) => {
    let newNetworks: Networks[] = [...activeNetworks];
    if (activeNetworks.includes(network)) {
      newNetworks = newNetworks.filter((item: Networks) => item !== network);
    } else {
      newNetworks.push(network);
    }
    setActiveNetworks(newNetworks);
  };

  const isActiveNetwork = useCallback(
    (item: Networks) => activeNetworks.includes(item),
    [activeNetworks],
  );

  return (
    <aside className={`${s.sidebar} ${mobileMenu.isActive && s.active} grey-scroll`}>
      <NavLink to="/" className={s.logo}>
        <div className={s.logo_icon}>
          <img src={logo} alt="logo" />
        </div>
        <div className={s.logo_text}>
          less<span>tools</span>
        </div>
      </NavLink>
      <div className={s.subtitle}>LESSBOARD</div>
      <LinkSidebar imgDark={board} imgWhite={board} to="/" text="LessBoard" />
      <div className={s.group}>
        <div
          className={s.group_title}
          role="button"
          tabIndex={0}
          onClick={() => handleChangeActiveNetwork(Networks.Ethereum)}
          onKeyDown={() => {}}
        >
          {!mobileMenu.isActive && (
            <div
              className={`${s.group_title_arrow} ${
                isActiveNetwork(Networks.Ethereum) && s.group_title_arrow_rotated
              }`}
            >
              <img src={arrowWhite} alt="img" />
            </div>
          )}
          <div className={s.group_title__text}>Ethereum</div>
          <div className={s.group_title__icon}>
            <img src={ethereum} alt="img" />
          </div>
        </div>
        {isActiveNetwork(Networks.Ethereum) && (
          <>
            <LinkSidebar
              imgDark={live}
              imgWhite={liveWhite}
              to="/ethereum/live-new-pairs"
              text="Live New Pairs"
            />
            <LinkSidebar
              imgDark={pair}
              imgWhite={pairWhite}
              to="/ethereum/pair-explorer/0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974"
              text="Pair Explorer"
            />
            <LinkSidebar
              imgDark={bigSwap}
              imgWhite={bigSwapWhite}
              to="/ethereum/big-swap-explorer"
              text="Big Swap Explorer"
            />
          </>
        )}
      </div>
      <div className={s.group}>
        <div
          className={s.group_title}
          role="button"
          tabIndex={0}
          onClick={() => handleChangeActiveNetwork(Networks.Binance)}
          onKeyDown={() => {}}
        >
          {!mobileMenu.isActive && (
            <div
              className={`${s.group_title_arrow} ${
                isActiveNetwork(Networks.Binance) && s.group_title_arrow_rotated
              }`}
            >
              <img src={arrowWhite} alt="img" />
            </div>
          )}
          <div className={s.group_title__text}>BSC</div>
          <div className={s.group_title__icon}>
            <img src={ethereum} alt="img" />
          </div>
        </div>
        {isActiveNetwork(Networks.Binance) && (
          <>
            <LinkSidebar
              imgDark={live}
              imgWhite={liveWhite}
              text="Live New Pairs"
              to="/sushiswap/live-new-pairs"
            />
            <LinkSidebar
              imgDark={pair}
              imgWhite={pairWhite}
              text="Pair Explorer"
              to="/sushiswap/pair-explorer/0xe06f8d30ac334c857fc8c380c85969c150f38a6a"
            />
            <LinkSidebar
              imgDark={bigSwap}
              imgWhite={bigSwapWhite}
              text="Big Swap Explorer"
              to="/sushiswap/big-swap-explorer"
            />
          </>
        )}
      </div>
      <div className={s.group}>
        <div
          className={s.group_title}
          role="button"
          tabIndex={0}
          onClick={() => handleChangeActiveNetwork(Networks.Polygon)}
          onKeyDown={() => {}}
        >
          {!mobileMenu.isActive && (
            <div
              className={`${s.group_title_arrow} ${
                isActiveNetwork(Networks.Polygon) && s.group_title_arrow_rotated
              }`}
            >
              <img src={arrowWhite} alt="img" />
            </div>
          )}
          <div className={s.group_title__text}>Polygon</div>
          <div className={s.group_title__icon}>
            <img src={ethereum} alt="img" />
          </div>
        </div>
        {isActiveNetwork(Networks.Polygon) && (
          <>
            <LinkSidebar
              imgDark={live}
              imgWhite={liveWhite}
              text="Live New Pairs"
              to="/quickswap/live-new-pairs"
            />
            <LinkSidebar
              imgDark={pair}
              imgWhite={pairWhite}
              text="Pair Explorer"
              to="/quickswap/pair-explorer/0x0024739eb63fb6697e63698c93c77b9508f15ab2"
            />
            <LinkSidebar
              imgDark={bigSwap}
              imgWhite={bigSwapWhite}
              text="Big Swap Explorer"
              to="/quickswap/big-swap-explorer"
            />
          </>
        )}
      </div>
      {/* <div className={s.group}>
        <div className={s.subtitle}>common</div>
        <LinkSidebar imgDark={bot} imgWhite={botWhite} text="New Pairs Bot" />
      </div> */}
      <div className={s.subtitle}>others</div>
      <LinkSidebar
        to="/user-account"
        imgDark={account}
        imgWhite={accountWhite}
        text="User Account"
      />
    </aside>
  );
});

export default Sidebar;
