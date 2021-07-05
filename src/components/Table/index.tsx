import { useState } from 'react';
import s from './Table.module.scss';

import { dataConverter } from './dataConverter';
import { IRowBigSwap, IRowLiveNewPairs, IRowPairExplorer } from '../../types/table';
import ReactTooltip from 'react-tooltip';

// TODO: доделать сортировку
// сортировка массива
const dataSorter = {

  valueSort(
    tableData: Array<IRowBigSwap | IRowLiveNewPairs | IRowPairExplorer>,
    defaultData: Array<IRowBigSwap | IRowLiveNewPairs | IRowPairExplorer>,
    key: string,
    sortCount: number,
  ) {
    let newData;
    if (sortCount === 0) {
      console.log('возрастание');
      // eslint-disable-next-line
      // @ts-ignore
      newData = tableData.sort((a, b) => a[key] - b[key]);
    } else if (sortCount === 1) {
      console.log('убывание');
      // eslint-disable-next-line
      // @ts-ignore
      newData = tableData.sort((a, b) => b[key] - a[key]);
    } else return defaultData;

    return [...newData];
  },
};

interface ITableProps {
  header: Array<{ key: string; title: string }>;
  data: Array<IRowBigSwap | IRowLiveNewPairs | IRowPairExplorer>;
  tableType: 'bigSwap' | 'liveNewPairs' | 'pairExplorer';
}

// TODO: вынести header в компонент отдельный
interface ITokenPriceHeader {
  isUsd: boolean;
  el: { title: string; key: string };
  handleToogleIsUsd: () => void;
}

const TokenPriceHeader: React.FC<ITokenPriceHeader> = ({ isUsd, el, handleToogleIsUsd }) => {
  return (
    <span>
      {`${el.title} ${isUsd ? 'USD' : 'ETH'}`}
      <span
        style={{ color: '#fff', cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        onClick={handleToogleIsUsd}
      >
        {' '}
        ({isUsd ? 'ETH' : 'USD'})
      </span>
    </span>
  );
};

const Table: React.FC<ITableProps> = ({ header, data, tableType }) => {
  const [tableData, setTableData] = useState([...data]);
  const [sortCount, setSortCount] = useState(0);

  // для переключения usd/eth в таблице live new pairs
  const [isUsd, setIsUsd] = useState(false);
  const handleToogleIsUsd = () => {
    setIsUsd(!isUsd);
  };

  return (
    <div className={s.table_wrap}>
      <ReactTooltip />
      <table className={s.table}>
        <thead className={s.table_head}>
          <tr>
            {header.map((el) => (
              <th
                key={el.key}
                onClick={() => {
                  console.log(sortCount >= 2 ? 0 : sortCount + 1);
                  setSortCount(sortCount >= 2 ? 0 : sortCount + 1);
                  setTableData(dataSorter.valueSort([...tableData], data, el.key, sortCount));
                }}
              >
                {el.key === 'tokenPrice' ? (
                  <TokenPriceHeader el={el} isUsd={isUsd} handleToogleIsUsd={handleToogleIsUsd} />
                ) : (
                  el.title
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={s.table_body}>
          {/* eslint-disable-next-line */}
          {/* @ts-ignore */}
          {dataConverter[tableType](tableData, isUsd).map((row, i) => (
            <tr className={i % 2 === 0 ? s.even : s.odd}>
              {Object.values(row).map((cell: any) => (
                <th>{cell}</th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
