import { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

import { dataConverter } from './dataConverter';
import { IRowBigSwap, IRowLiveNewPairs, IRowPairExplorer } from '../../types/table';
import TokenPriceHeader from './TokenPriceHeader';
import { dataSorter } from './dataSorter';

import s from './Table.module.scss';

import sorterDown from '../../assets/img/icons/table/sort-down.svg';
import sorterUp from '../../assets/img/icons/table/sort-up.svg';

export type ITableHeader = Array<{
  key: string;
  title: string;
  sortType?: 'string' | 'number' | 'date';
}>;

interface ITableProps {
  header: ITableHeader;
  data: Array<IRowBigSwap | IRowLiveNewPairs | IRowPairExplorer>;
  tableType: 'bigSwap' | 'liveNewPairs' | 'pairExplorer';
}

// TODO: live new pairs listed since bug in sort
const Table: React.FC<ITableProps> = ({ header, data, tableType }) => {
  const [tableData, setTableData] = useState(data);
  const [sortCount, setSortCount] = useState(0);

  useEffect(() => {
    setTableData([...data]);
  }, [data]);

  // для переключения usd/eth в таблице live-new-pairs
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
              <th key={el.key}>
                <div className={s.th_inner}>
                  {el.key === 'tokenPrice' ? (
                    <TokenPriceHeader el={el} isUsd={isUsd} handleToogleIsUsd={handleToogleIsUsd} />
                  ) : (
                    el.title
                  )}
                  {el.sortType && (
                    <div
                      tabIndex={0}
                      role="button"
                      onKeyDown={() => {}}
                      className={s.th_sorter}
                      onClick={() => {
                        setTableData(
                          dataSorter(
                            [...tableData],
                            data,
                            el.key,
                            sortCount,
                            el.sortType || 'string',
                          ),
                        );
                        setSortCount(sortCount >= 2 ? 0 : sortCount + 1);
                      }}
                    >
                      <div className={s.th_sorter__up}>
                        <img src={sorterUp} alt="up" />
                      </div>
                      <div className={s.th_sorter__down}>
                        <img src={sorterDown} alt="down" />
                      </div>
                    </div>
                  )}
                </div>
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
