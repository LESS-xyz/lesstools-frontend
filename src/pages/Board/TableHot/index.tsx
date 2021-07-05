import React from 'react';

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
              HOT <span>UNI</span>
            </div>
          </th>
          <th colSpan={2}>
            <div className={s.tbl_head_title}>
              <img src={Fire} alt="Fire" />
              HOT <span>SUSHI</span>
            </div>
          </th>
        </tr>
      </thead>

      <tr className={s.tbl_info_title}>
        <th>
          <div className={s.tbl_info_title_body}>
            <div className={s.tbl_info_title_body_logo}>
              <img src={Emax} alt="emax" />
              eMax
            </div>
            <span>EthereumMax</span>
            <strong className={s.red}>$0.0..00114</strong>
          </div>
        </th>
        <th>
          <img src={Compass} alt="compass" />
        </th>
        <th>
          <div className={s.tbl_info_title_body}>
            <div className={s.tbl_info_title_body_logo}>
              <img src={Spell} alt="spell" />
              SPELL
            </div>
            <span>EthereumMax</span>
            <strong className={s.green}>$0.0..00114</strong>
          </div>
        </th>
        <th>
          <img src={Compass} alt="compass" />
        </th>
      </tr>

      <tbody className={s.tbl_body}>
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
                <div className={s.tbl_body_row_value}>
                  <span className={s.red}>${item.value}</span>
                </div>
              </th>
              <th>
                <img src={Compass} alt="compass" />
              </th>

              <th>
                <div className={s.tbl_body_row}>
                  <div className={s.tbl_body_row_title}>
                    {tableData.spell[index].title}
                    <img src={ArrowDw} alt="arrow" />
                  </div>
                </div>
                <div className={s.tbl_body_row_value}>
                  <span className={s.green}>${tableData.spell[index].value}</span>
                </div>
              </th>
              <th>
                <img src={Compass} alt="compass" />
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableHot;
