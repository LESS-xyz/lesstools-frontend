import React from 'react';

import Uniswap from '../../../assets/img/sections/board/uniswap.svg';
import Search from '../../../components/Search';

import s from './Tools.module.scss';

const Tools: React.FC = () => {
  const onChangeHandler = () => {};

  return (
    <div className={s.tools}>
      <div className={s.tools_title}>
        <div className={s.tools_title_bg}>
          <div className={s.tools_title__cl}>
            <img src={Uniswap} alt="Uniswap" />
          </div>
          <p>
            UNISWAP V2 <span>TOOLS</span>
          </p>
        </div>
      </div>
      <Search value="123" onChange={() => onChangeHandler} />
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum odio consequuntur optio
        alias animi, magni iste facere! Quae quis officia explicabo minima reiciendis cumque nostrum
        dolore nihil tenetur tempore. Fuga sit facilis debitis commodi obcaecati minima officiis
        rerum quibusdam et velit reiciendis magni accusantium maiores, voluptates mollitia!
        Quibusdam, hic cumque!
      </p>
    </div>
  );
};

export default Tools;
