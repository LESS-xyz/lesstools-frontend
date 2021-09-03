import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { WHITELIST } from '../../../data/whitelist';

import { IPairFromGraph } from '../../../components/CommonQueries/HotPairs';

import s from './HotTable.module.scss';

import compass from '../../../assets/img/sections/board-page/compass.svg';

interface ITableCellProps {
  tokenSymbol: string;
  tokenPrice: string;
  pairId: string;
  exchange: 'sushiswap' | 'uniswap';
}

const TableCell: React.FC<ITableCellProps> = ({ tokenSymbol, tokenPrice, pairId, exchange }) => {
  return (
    <div className={s.table_body__item}>
      <div className={s.table_body__item_left}>
        <div className={s.table_body__item_left__token}>{tokenSymbol}</div>
        <p>${tokenPrice}</p>
      </div>
      <Link to={`/app/${exchange}/pair-explorer/${pairId}`} className={s.table_body__item_right}>
        <img src={compass} alt="compass" />
      </Link>
    </div>
  );
};

interface IHotTableProps {
  pairs: any;
  title: string;
  logo: string;
}

const HotTable: React.FC<IHotTableProps> = observer(({ pairs, title, logo }) => {
  return (
    <section className={s.table}>
      <div className={s.table_header}>
        <div className={`${s.table_header__bg} ${s.sushi}`}>
          <div className={s.table_header__icon}>
            <div className={s.table_header__icon_img}>
              <img src={logo} alt="logo" />
            </div>
            <div className={s.table_header__icon_text}>
              <span>{title}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={s.table_body}>
        {pairs.map((pair: IPairFromGraph) => (
          <TableCell
            key={`${pair.hourlyTxns}-${pair.pair.id}`}
            tokenPrice={Number(
              WHITELIST.includes(pair.pair.token1.id)
                ? pair.pair.token0.derivedUSD
                : pair.pair.token1.derivedUSD,
            ).toFixed(5)}
            tokenSymbol={
              WHITELIST.includes(pair.pair.token1.id)
                ? pair.pair.token0.symbol
                : pair.pair.token1.symbol
            }
            pairId={pair.pair.id}
            exchange={title === 'HOT UNI' ? 'uniswap' : 'sushiswap'}
          />
        ))}
      </div>
    </section>
  );
});

export default HotTable;
