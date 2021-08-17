import { observer } from 'mobx-react-lite';

import { IPairFromGraph } from '../../../components/CommonQueries/HotPairs';

import s from './HotTable.module.scss';

import uniLogo from '../../../assets/img/sections/board-page/uni-logo.svg';
import compass from '../../../assets/img/sections/board-page/compass.svg';

interface ITableCellProps {
  tokenSymbol: string;
  tokenPrice: string;
  pairId: string;
}

const TableCell: React.FC<ITableCellProps> = ({ tokenSymbol, tokenPrice }) => {
  return (
    <div className={s.table_body__item}>
      <div className={s.table_body__item_left}>
        <div className={s.table_body__item_left__token}>{tokenSymbol}</div>
        <p>${tokenPrice}</p>
      </div>
      <div className={s.table_body__item_right}>
        <img src={compass} alt="compass" />
      </div>
    </div>
  );
};

interface IHotTableProps {
  pairs: Array<IPairFromGraph>;
}

const HotTable: React.FC<IHotTableProps> = observer(({ pairs }) => {
  return (
    <section className={s.table}>
      <div className={s.table_header}>
        <div className={`${s.table_header__bg} ${s.sushi}`}>
          <div className={s.table_header__icon}>
            <div className={s.table_header__icon_img}>
              <img src={uniLogo} alt="uniLogo" />
            </div>
            <div className={s.table_header__icon_text}>
              <span>HOT UNI</span>
            </div>
          </div>
        </div>
      </div>
      <div className={s.table_body}>
        {pairs.map((pair) => (
          <TableCell
            tokenPrice={Number(pair.pair.token0.derivedUSD).toFixed(2)}
            tokenSymbol={pair.pair.token0.symbol}
            pairId={pair.pair.id}
          />
        ))}
      </div>
    </section>
  );
});

export default HotTable;
