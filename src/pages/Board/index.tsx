import React from 'react';

import Banner from '../../assets/img/sections/board/banner.svg';
import Fier from '../../assets/img/sections/board/fire.svg';

import Tools from './Tools';

import s from './Board.module.scss';

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
                <Tools />
              </div>
              <div className={s.block_board_item}>
                <h1>Board</h1>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum odio
                  consequuntur optio alias animi, magni iste facere! Quae quis officia explicabo
                  minima reiciendis cumque nostrum dolore nihil tenetur tempore. Fuga sit facilis
                  debitis commodi obcaecati minima officiis rerum quibusdam et velit reiciendis
                  magni accusantium maiores, voluptates mollitia! Quibusdam, hic cumque!
                </p>
              </div>
              <div className={s.block_board_item}>
                <h1>Board</h1>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum odio
                  consequuntur optio alias animi, magni iste facere! Quae quis officia explicabo
                  minima reiciendis cumque nostrum dolore nihil tenetur tempore. Fuga sit facilis
                  debitis commodi obcaecati minima officiis rerum quibusdam et velit reiciendis
                  magni accusantium maiores, voluptates mollitia! Quibusdam, hic cumque!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
