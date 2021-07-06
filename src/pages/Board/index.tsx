import React from 'react';

import Banner from '../../assets/img/sections/board/banner.svg';
import Fier from '../../assets/img/sections/board/fire.svg';
import Sushi from '../../assets/img/sections/board/sushi.svg';
import Uniswap from '../../assets/img/sections/board/uniswap.svg';

import Featured from './Featured';
import TableHot from './TableHot';
import Tools from './Tools';

import s from './Board.module.scss';

const toolsItems = [
  {
    logo: Uniswap,
    title: 'UNISWAP V2',
  },
  {
    logo: Sushi,
    title: 'SUSHI',
  },
  {
    logo: '',
    title: 'COMMON',
  },
];

const Board: React.FC = () => {
  return (
    <div className={s.board}>
      <div className={s.bg_wrap}>
        <div className={s.container}>
          <div className={s.block}>
            <div className={s.block_title}>
              <ul className={s.block_title_list}>
                <li className={s.block_title_list__mr}>
                  <p>NEXT DEXTSHARE</p>
                  <span>2021-07-01 1,098,873 DEXT</span>
                </li>
                <li>
                  <p>NEXT TOKEN BURN</p>
                  <span>2021-07-01 10,986 DEXT</span>
                </li>
                <li>
                  <img src={Fier} alt="Fier" />
                </li>
              </ul>
            </div>
            <div className={s.block_banner}>
              <img src={Banner} alt="Banner" />
            </div>
            <div className={s.block_board}>
              <div className={s.block_board_item}>
                {toolsItems.map((tool) => (
                  <Tools key={Math.random()} title={tool.title} logo={tool.logo} />
                ))}
              </div>
              <div className={s.block_board_item}>
                <TableHot />
              </div>
              <div className={s.block_board_item}>
                <Featured />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
