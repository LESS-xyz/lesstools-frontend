import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { WHITELIST } from '../../../data/whitelist';

import { IPairFromGraph } from '../../../components/CommonQueries/HotPairs';

import s from './HotTable.module.scss';

import compass from '../../../assets/img/sections/board-page/compass.svg';
import Checkbox from '../../../components/Checkbox';

enum Networks {
  Ethereum = 'ETH',
  Binance = 'BSC',
  Polygon = 'Polygon',
}

interface ITableCellProps {
  tokenSymbol: string;
  tokenPrice: string;
  pairId: string;
  exchange: 'sushiswap' | 'uniswap';
}

const TableCell: React.FC<ITableCellProps> = ({ tokenSymbol, tokenPrice, pairId, exchange }) => {
  return (
    <div className={s.table_body__item}>
      <Link to={`/${exchange}/pair-explorer/${pairId}`}>
        <div className={s.table_body__item_left}>
          <div className={s.table_body__item_left__token}>{tokenSymbol}</div>
          <p>${tokenPrice}</p>
        </div>
        <span>
          <img src={compass} alt="compass" />
        </span>
      </Link>
    </div>
  );
};

interface IHotTableProps {
  pairs?: any;
  title?: string;
  logo?: string;
}

const HotTable: React.FC<IHotTableProps> = observer((props) => {
  const { pairs = {}, title } = props;

  const [network, setNetwork] = useState<Networks>(Networks.Ethereum);

  let pairsCurrent = [];
  if (network === Networks.Ethereum) {
    pairsCurrent = pairs.uniswap;
  } else if (network === Networks.Binance) {
    pairsCurrent = pairs.sushiswap;
  } else if (network === Networks.Polygon) {
    pairsCurrent = pairs.sushiswap;
  }

  return (
    <section className={s.table}>
      <div className={s.table_header}>
        <div className={`${s.table_header__bg} ${s.sushi}`}>
          <div className={s.table_header__icon}>
            <div className={s.table_header__icon_img}>{/* <img src={logo} alt="logo" /> */}</div>
            <div className={s.table_header__icon_text}>
              <span>{title}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={s.checkboxes}>
        <Checkbox
          onClick={() => setNetwork(Networks.Ethereum)}
          checked={network === Networks.Ethereum}
        >
          Hot {Networks.Ethereum}
        </Checkbox>
        <Checkbox
          onClick={() => setNetwork(Networks.Binance)}
          checked={network === Networks.Binance}
        >
          Hot {Networks.Binance}
        </Checkbox>
        <Checkbox
          onClick={() => setNetwork(Networks.Polygon)}
          checked={network === Networks.Polygon}
        >
          Hot {Networks.Polygon}
        </Checkbox>
      </div>
      <div className={s.table_body}>
        {!pairsCurrent.length &&
          new Array(10)
            .fill(1)
            .map((el, index) => <div key={`${el}-${index * index}`} className={s.empty_cell} />)}
        {pairsCurrent.map((pair: IPairFromGraph) => (
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
