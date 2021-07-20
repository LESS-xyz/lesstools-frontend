import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';

import Table from '../../components/Table/index';
import InfoBlock from '../../components/InfoBlock/index';
import Search from '../../components/Search/index';
import AdBlock from '../../components/AdBlock/index';
import { IRowBigSwap } from '../../types/table';

import s from './BigSwapExplorer.module.scss';

import ad from '../../assets/img/sections/ad/ad1.png';

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

const exampleTableData: Array<IRowBigSwap> = [
  {
    pair: '1',
    time: '2021-06-11 13:29:10',
    type: 'sell',
    quantity: 38.43584,
    totalEth: 5.76,
    totalUsd: 18.224,
    change: 22.31,
    others: {
      liveData: '0xdfsdf',
      etherscan: '0xdfsdf',
    },
  },
  {
    pair: '2',
    time: '2021-06-11 13:29:10',
    type: 'sell',
    quantity: 36.6045435,
    totalEth: 7.76,
    totalUsd: 205.224,
    change: 32.31,
    others: {
      liveData: '0xdfsdf',
      etherscan: '0xdfsdf',
    },
  },
  {
    pair: '1',
    time: '2021-06-11 13:29:10',
    type: 'sell',
    quantity: 38.43584,
    totalEth: 5.76,
    totalUsd: 18.224,
    change: 22.31,
    others: {
      liveData: '0xdfsdf',
      etherscan: '0xdfsdf',
    },
  },
  {
    pair: '2',
    time: '2021-06-11 13:29:10',
    type: 'buy',
    quantity: 36.6045435,
    totalEth: 7.76,
    totalUsd: 205.224,
    change: 32.31,
    others: {
      liveData: '0xdfsdf',
      etherscan: '0xdfsdf',
    },
  },
  {
    pair: '1',
    time: '2021-06-11 13:29:10',
    type: 'sell',
    quantity: 38.43584,
    totalEth: 5.76,
    totalUsd: 18.224,
    change: 22.31,
    others: {
      liveData: '0xdfsdf',
      etherscan: '0xdfsdf',
    },
  },
  {
    pair: '2',
    time: '2021-06-11 13:29:10',
    type: 'buy',
    quantity: 36.6045435,
    totalEth: 7.76,
    totalUsd: 205.224,
    change: 32.31,
    others: {
      liveData: '0xdfsdf',
      etherscan: '0xdfsdf',
    },
  },
];

const BigSwapExplorer: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const [tableData, setTableData] = useState([...exampleTableData]);

  useEffect(() => {
    const filtredTable = [...exampleTableData.filter((row) => row.pair.includes(searchValue))];
    setTableData(filtredTable);
  }, [searchValue]);

  return (
    <main className={s.section}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>BigSwapExplorer - LessTools</title>
        <meta
          name="description"
          content="Multi-Chain Decentralized
Fundraising Capital"
        />
      </Helmet>
      <div className={s.container}>
        <AdBlock adImg={ad} />
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
