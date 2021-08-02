import React from 'react';
import { Link } from 'react-router-dom';

import ArrowDw from '../../../assets/img/sections/board/arrow-dw.svg';
import ArrowUp from '../../../assets/img/sections/board/arrow-up.svg';
import Compass from '../../../assets/img/sections/board/compass.svg';
import Emax from '../../../assets/img/sections/board/emax.svg';
import Fire from '../../../assets/img/sections/board/fire.svg';
import Spell from '../../../assets/img/sections/board/spell.svg';

import s from './TableHot.module.scss';

const tableData = {
  eMax: [
    {
      title: 'LIME',
      value: 0.04641953,
    },
    {
      title: 'JEJUDOGE',
      value: 0.04641953,
    },
    {
      title: 'GTC',
      value: 0.04641953,
    },
    {
      title: 'LIGHT',
      value: 0.04641953,
    },
    {
      title: 'SHIB',
      value: 0.04641953,
    },
    {
      title: 'HOKK',
      value: 0.04641953,
    },
    {
      title: 'LEASH',
      value: 0.04641953,
    },
    {
      title: 'BEZOGE',
      value: 0.04641953,
    },
  ],
  spell: [
    {
      title: 'RGT',
      value: 0.04641953,
    },
    {
      title: 'CVX',
      value: 0.04641953,
    },
    {
      title: 'SUSHI',
      value: 0.04641953,
    },
    {
      title: 'APW',
      value: 0.04641953,
    },
    {
      title: 'OHM',
      value: 0.04641953,
    },
    {
      title: 'DELTA',
      value: 0.04641953,
    },
    {
      title: 'BIOS',
      value: 0.04641953,
    },
    {
      title: 'HNY',
      value: 0.04641953,
    },
  ],
};

const TableHot: React.FC = () => {
  return (
    <table className={s.tbl}>
      <thead className={s.tbl_head}>
        <tr>
          <th colSpan={2}>
            <div className={s.tbl_head_title}>
              <img src={Fire} alt="Fire" />
              <h1>
                HOT<span>UNI</span>
              </h1>
            </div>
          </th>
          <th colSpan={2}>
            <div className={s.tbl_head_title}>
              <img src={Fire} alt="Fire" />
              <h1>
                HOT<span>SUSHI</span>
              </h1>
            </div>
          </th>
        </tr>
      </thead>

      <tbody className={s.tbl_body}>
        <tr className={s.tbl_body_header}>
          <th>
            <div className={s.tbl_body_header_main}>
              <div className={s.tbl_body_header_main_logo}>
                <img src={Emax} alt="emax" />
                <h2>eMax</h2>
              </div>
              <span>EthereumMax</span>
              <strong className={s.red}>$0.0..00114</strong>
            </div>
          </th>
          <th>
            <Link to="/">
              <img src={Compass} alt="compass" />
            </Link>
          </th>
          <th>
            <div className={s.tbl_body_header_main}>
              <div className={s.tbl_body_header_main_logo}>
                <img src={Spell} alt="spell" />
                <h2>SPELL</h2>
              </div>
              <span>EthereumMax</span>
              <strong className={s.green}>$0.0..00114</strong>
            </div>
          </th>
          <th>
            <Link to="/">
              <img src={Compass} alt="compass" />
            </Link>
          </th>
        </tr>

        {tableData.eMax.map((item, index) => {
          return (
            <tr key={item.value + Math.random()} className={s.tbl_body_row}>
              <th>
                <div className={s.tbl_body_row}>
                  <div className={s.tbl_body_row_title}>
                    {item.title}
                    <img src={ArrowUp} alt="arrow" />
                  </div>
                </div>
                <div className={s.tbl_body_row}>
                  <span className={s.red}>${item.value}</span>
                </div>
              </th>
              <th>
                <Link to="/">
                  <img src={Compass} alt="compass" />
                </Link>
              </th>

              <th>
                <div className={s.tbl_body_row}>
                  <div className={s.tbl_body_row_title}>
                    {tableData.spell[index].title}
                    <img src={ArrowDw} alt="arrow" />
                  </div>
                </div>
                <div className={s.tbl_body_row}>
                  <span className={s.green}>${tableData.spell[index].value}</span>
                </div>
              </th>
              <th>
                <Link to="/">
                  <img src={Compass} alt="compass" />
                </Link>
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableHot;
