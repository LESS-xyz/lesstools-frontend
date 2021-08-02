import React from 'react';

import Big from '../../../assets/img/sections/board/big.svg';
import Live from '../../../assets/img/sections/board/live.svg';
import Pair from '../../../assets/img/sections/board/pair.svg';
import Button from '../../../components/Button';
import Search from '../../../components/Search';

import s from './Tools.module.scss';

interface ITools {
  logo: any;
  title: string;
}

const btnArr = [
  {
    id: 1,
    btnLogo: Live,
    btnTitle: 'Live New Paris',
  },
  {
    id: 2,
    btnLogo: Pair,
    btnTitle: 'Pair Explorer',
  },
  {
    id: 3,
    btnLogo: Big,
    btnTitle: 'Big Swap Explorer',
  },
];

const Tools: React.FC<ITools> = ({ logo, title }) => {
  const onChangeHandler = () => {};

  return (
    <div className={s.tools}>
      <div className={s.tools_title}>
        <div className={s.tools_title_items}>
          {logo !== '' ? (
            <img src={logo} alt="Logo" className={s.tools_title__cl} />
          ) : (
            <div className={s.tools_title__cl} />
          )}
          <p>
            {title} <span>TOOLS</span>
          </p>
        </div>
      </div>

      <div className={s.tools_card}>
        <div className={s.tools_card_items}>
          <Search
            placeholder="Search pair by symbol / name / pair co..."
            value=""
            onChange={() => onChangeHandler}
          />

          <div className={s.tools_card_items_btns}>
            {btnArr.map((btn) => {
              return (
                <Button long filled gradient marginRight={12} key={btn.id}>
                  <div className={s.tools_card_items_btns__body}>
                    <img src={btn.btnLogo} alt="pair" />
                    {btn.btnTitle}
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
