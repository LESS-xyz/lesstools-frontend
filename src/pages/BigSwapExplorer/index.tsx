import Table from '../../components/Table/index';
import s from './BigSwapExplorer.module.scss';
import otherIcon1 from '../../assets/img/icons/table/other-1.svg';
import otherIcon2 from '../../assets/img/icons/table/other-2.svg';
import InfoBlock from '../../components/InfoBlock/index';
import Search from '../../components/Search/index';
import { useState } from 'react';

// headers for table
const headerData = [
  { key: 'pair', title: 'Pair' },
  { key: 'time', title: 'Time' },
  { key: 'type', title: 'Type' },
  { key: 'quantity', title: 'Quantity' },
  { key: 'totalEth', title: 'Total ETH' },
  { key: 'totalUsd', title: 'Total USD' },
  { key: 'change', title: 'Change' },
  { key: 'others', title: 'Others' },
];

const tableData = [
  {
    pair: '1',
    time: '2021-06-11 13:29:10',
    type: 'Sell',
    quantity: 38.43584,
    totalEth: 5.76,
    totalUsd: 18.224,
    change: 22.31,
    others: [otherIcon1, otherIcon2],
  },
  {
    pair: '2',
    time: '2021-06-11 13:29:10',
    type: 'Sell',
    quantity: 36.6045435,
    totalEth: 7.76,
    totalUsd: 205.224,
    change: 32.31,
    others: [otherIcon1, otherIcon2],
  },
  {
    pair: '3',
    time: '2021-06-11 13:29:10',
    type: 'Sell',
    quantity: 12.6045435,
    totalEth: 7.76,
    totalUsd: 144.224,
    change: 2.31,
    others: [otherIcon1, otherIcon2],
  },
  {
    pair: '4',
    time: '2021-06-11 13:29:10',
    type: 'Sell',
    quantity: 102.6045435,
    totalEth: 7.76,
    totalUsd: 4.224,
    change: 205.31,
    others: [otherIcon2, otherIcon1],
  },
  {
    pair: '1',
    time: '2021-06-11 13:29:10',
    type: 'Sell',
    quantity: 38.43584,
    totalEth: 5.76,
    totalUsd: 18.224,
    change: 22.31,
    others: [otherIcon1, otherIcon2],
  },
  {
    pair: '2',
    time: '2021-06-11 13:29:10',
    type: 'Sell',
    quantity: 36.6045435,
    totalEth: 7.76,
    totalUsd: 205.224,
    change: 32.31,
    others: [otherIcon1, otherIcon2],
  },
  {
    pair: '3',
    time: '2021-06-11 13:29:10',
    type: 'Sell',
    quantity: 12.6045435,
    totalEth: 7.76,
    totalUsd: 144.224,
    change: 2.31,
    others: [otherIcon1, otherIcon2],
  },
  {
    pair: '4',
    time: '2021-06-11 13:29:10',
    type: 'Sell',
    quantity: 102.5045435,
    totalEth: 7.76,
    totalUsd: 4.224,
    change: 205.31,
    others: [otherIcon2, otherIcon1],
  },
  {
    pair: '3',
    time: '2021-06-11 13:29:10',
    type: 'Sell',
    quantity: 12.6045435,
    totalEth: 7.76,
    totalUsd: 144.224,
    change: 2.31,
    others: [otherIcon1, otherIcon2],
  },
  {
    pair: '4',
    time: '2021-06-11 13:29:10',
    type: 'Sell',
    quantity: 102.6045435,
    totalEth: 7.76,
    totalUsd: 4.224,
    change: 205.31,
    others: [otherIcon2, otherIcon1],
  },
  {
    pair: '1',
    time: '2021-06-11 13:29:10',
    type: 'Sell',
    quantity: 38.43584,
    totalEth: 5.76,
    totalUsd: 18.224,
    change: 22.31,
    others: [otherIcon1, otherIcon2],
  },
  {
    pair: '2',
    time: '2021-06-11 13:29:10',
    type: 'Sell',
    quantity: 36.6045435,
    totalEth: 7.76,
    totalUsd: 205.224,
    change: 32.31,
    others: [otherIcon1, otherIcon2],
  },
  {
    pair: '3',
    time: '2021-06-11 13:29:10',
    type: 'Sell',
    quantity: 12.6045435,
    totalEth: 7.76,
    totalUsd: 144.224,
    change: 2.31,
    others: [otherIcon1, otherIcon2],
  },
  {
    pair: '4',
    time: '2021-06-11 13:29:10',
    type: 'Sell',
    quantity: 102.5045435,
    totalEth: 7.76,
    totalUsd: 4.224,
    change: 205.31,
    others: [otherIcon2, otherIcon1],
  },
];

const BigSwapExplorer: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <main className={s.section}>
      <div className={s.ad}>advertiesment block</div>
      <div className={s.container}>
        <InfoBlock
          topTokens={[
            'KISHU',
            'JEJUDOGE',
            'eMax',
            'IOI',
            'EPAY',
            'SHIB',
            'GTC',
            'ERN',
            'LITH',
            'WWT',
          ]}
        />
        <div className={s.info}>
          <div className={s.info_left}>
            <div className={s.info_title}>Big Swap Explorer</div>
            <div className={s.info_subtitle}>
              Shows latest big swaps in uniswap with useful information
            </div>
          </div>
          <div className={s.info_right}>
            <Search value={searchValue} onChange={setSearchValue} placeholder="Search" />
          </div>
        </div>

        <Table data={tableData} header={headerData} tableType="bigSwap" />
      </div>
    </main>
  );
};

export default BigSwapExplorer;
