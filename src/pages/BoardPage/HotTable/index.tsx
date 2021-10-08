import { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { WHITELIST } from '../../../data/whitelist';
import { IPairFromGraph } from '../../../components/CommonQueries/HotPairs';
import { Networks, NetworksForHotTable } from '../../../config/networks';
import s from './HotTable.module.scss';
import compass from '../../../assets/img/sections/board-page/compass.svg';
import Checkbox from '../../../components/Checkbox';
import { useStoreContext } from '../../../contexts/MobxConnector';
import { newObject } from "../../../utils/formatDataTypes";

interface ITableCellProps {
  tokenSymbol: string;
  tokenPrice: string;
  pairId: string;
  network?: string;
}

const TableCell: React.FC<ITableCellProps> = ({ tokenSymbol, tokenPrice, pairId, network }) => {
  return (
    <div className={s.table_body__item}>
      <Link to={`/${network?.toLowerCase()}/pair-explorer/${pairId}`}>
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
  const { title } = props;
  const { store } = useStoreContext();
  const { hotPairs } = store;

  const [network, setNetwork] = useState<Networks | string>(Networks.Ethereum);
  const [tableData, setTableData] = useState<any[]>([]);

  const showHotPairs = useCallback(() => {
    try {
      const hotPairsNew = newObject(hotPairs);
      const newTableData = hotPairsNew[network].slice(0, 20);
      if (newTableData) setTableData(newTableData);
      console.log('HotTable showHotPairs:', { hotPairs: hotPairsNew , newTableData });
    } catch (e) {
      console.error(e);
    }
  }, [network, hotPairs]);

  useEffect(() => {
    if (!network) return;
    if (!hotPairs) return;
    showHotPairs();
  }, [network, hotPairs, showHotPairs]);

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
        {Object.entries(NetworksForHotTable).map((item: [string, string]) => {
          const [net, networkName] = item;
          return (
            <Checkbox
              onClick={() => setNetwork(net)}
              checked={network === net}
            >
              Hot {networkName}
            </Checkbox>
          );
        })}
      </div>
      <div className={s.table_body}>
        {!tableData.length &&
          new Array(20).fill(1).map(() => <div key={uuid()} className={s.empty_cell} />)}
        {tableData.map((pair: IPairFromGraph) => {
          return (
            <TableCell
              key={uuid()}
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
              network={network}
            />
          );
        })}
      </div>
    </section>
  );
});

export default HotTable;
