import React from 'react';
import { Link } from 'react-router-dom';

import Araid from '../../../assets/img/sections/board/araid.svg';
import Compass from '../../../assets/img/sections/board/compass-big.svg';
import Ene from '../../../assets/img/sections/board/ene.svg';
import Home from '../../../assets/img/sections/board/home.svg';
import Hors from '../../../assets/img/sections/board/hors.svg';
import Kwik from '../../../assets/img/sections/board/kwik.svg';
import Telegram from '../../../assets/img/sections/board/telegram.svg';
import Twitter from '../../../assets/img/sections/board/twitter.svg';

import s from './Featured.module.scss';

const Featured: React.FC = () => {
  const cardsData = [
    {
      id: 1,
      logo: Kwik,
      title: 'KWIK',
      color: 'blue',
      mainText: 'KwikSwap',
      secText: 'Multi-Chain Decentralised Swap Exchange Protocol',
    },
    {
      id: 2,
      logo: Ene,
      title: 'ENE',
      color: 'green',
      mainText: 'Enedex',
      secText:
        'The first Polkadot Moonbeam crosschain DEX for Energy Derivatives Trading and Launchpad for Renewable Energy Projects',
    },
    {
      id: 3,
      logo: Araid,
      title: 'ARAID',
      color: 'red',
      mainText: 'AirRaid',
      secText: 'The worlds first safe and transparent decentralized lottery just launched.',
    },
  ];

  return (
    <div className={s.cards}>
      <div className={s.cards_header}>
        <h1>FEATURED SPONSORS</h1>
      </div>
      {cardsData.map((item) => {
        return (
          <div className={s.cards_card} key={item.id + Math.random()}>
            <div className={s.cards_card_left}>
              <img src={item.logo} alt="logo" />
            </div>
            <div className={s.cards_card_right}>
              <div className={`${s.cards_card_right_title} ${s[item.color]}`}>
                <h2>{item.title}</h2>
                <Link to="/">
                  <img src={Hors} alt="hors" />
                </Link>
                <Link to="/">
                  <img src={Compass} alt="compass" />
                </Link>
              </div>
              <div className={s.cards_card_right_main}>
                {item.mainText}
                <Link to="/">
                  <img src={Home} alt="home" />
                </Link>
                <Link to="/">
                  <img src={Twitter} alt="Twitter" />
                </Link>
                <Link to="/">
                  <img src={Telegram} alt="Telegram" />
                </Link>
              </div>
              <div className={s.cards_card_right_secondary}>{item.secText}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Featured;
