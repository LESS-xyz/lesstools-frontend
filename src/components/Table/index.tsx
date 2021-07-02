import { useState } from 'react';
import s from './Table.module.scss';

interface IRowBigSwap {
  pair: string;
  time: string | Date;
  type: string;
  quantity: number;
  totalEth: number;
  totalUsd: number;
  change: number;
  others: Array<string>;
}

interface IRowLiveNewPairs {
  token: string;
  listedSince: string | Date;
  actions: Array<string>;
  contractDetails: Array<string>;
  tokenPrice: number;
  totalLiquidity: number;
  poolAmount: number;
  poolVariation: number;
  poolRemaining: number;
}

// TODO: доделать сортировку
// сортировка массива
const dataSorter = {
  valueSort(
    tableData: Array<IRowBigSwap | IRowLiveNewPairs>,
    defaultData: Array<IRowBigSwap | IRowLiveNewPairs>,
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

// преобразовывает входной JSON в объект с JSX полями
const dataConverter = {
  bigSwap(data: Array<IRowBigSwap>) {
    return data.map((row) => ({
      pair: <span className={s.pair}>{row.pair}</span>,
      time: row.time,
      type: <span className={s.type}>{row.type}</span>,
      quantity: row.quantity,
      totalEth: row.totalEth,
      totalUsd: <span>${row.totalUsd}</span>,
      change: <span className={s.change}>{row.change}%</span>,
      others: (
        <div className={s.others}>
          {row.others.map((img) => (
            <img src={img} alt="icon" />
          ))}
        </div>
      ),
    }));
  },

  liveNewPairs(data: Array<IRowLiveNewPairs>) {
    return data.map((row) => ({
      token: <span className={s.token}>{row.token}</span>,
      listedSince: row.listedSince,
      actions: row.actions[0],
      contractDetails: row.contractDetails[0],
      tokenPrice: String(row.tokenPrice),
      totalLiquidity: row.totalLiquidity,
      poolAmount: row.poolAmount,
      poolVariation: row.poolVariation,
      poolRemaining: row.poolRemaining,
    }));
  },
};

interface ITableProps {
  header: Array<{ key: string; title: string }>;
  data: Array<IRowBigSwap | IRowLiveNewPairs>;
  tableType: 'bigSwap' | 'liveNewPairs';
}

const Table: React.FC<ITableProps> = ({ header, data, tableType }) => {
  const [tableData, setTableData] = useState([...data]);
  const [sortCount, setSortCount] = useState(0);

  return (
    <table className={s.table}>
      <thead className={s.table_head}>
        <tr>
          {header.map((el) => (
            <th
              key={el.key}
              onClick={() => {
                console.log(sortCount >= 2 ? 0 : sortCount + 1);
                setSortCount(sortCount >= 2 ? 0 : sortCount + 1);
                setTableData(dataSorter.valueSort(tableData, data, el.key, sortCount));
              }}
            >
              {el.title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className={s.table_body}>
        {/* eslint-disable-next-line */}
        {/* @ts-ignore */}
        {dataConverter[tableType](tableData).map((row, i) => (
          <tr className={i % 2 === 0 ? s.even : s.odd}>
            {Object.values(row).map((cell: any) => (
              <th>{cell}</th>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
