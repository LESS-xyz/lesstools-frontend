import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';

import Table, { ITableHeader } from '../../components/Table/index';
import InfoBlock from '../../components/InfoBlock/index';
import Search from '../../components/Search/index';
import AdBlock from '../../components/AdBlock/index';

import s from '../BigSwapExplorer/BigSwapExplorer.module.scss';

import ad from '../../assets/img/sections/ad/ad1.png';

// headers for table
const headerData: ITableHeader = [
  { key: 'token', title: 'Token', sortType: 'string' },
  { key: 'listedSince', title: 'Listed Since', sortType: 'date' },
  { key: 'actions', title: 'Actions' },
  { key: 'contractDetails', title: 'Contract Details' },
  { key: 'tokenPrice', title: 'Token Price', sortType: 'number' },
  { key: 'totalLiquidity', title: 'Total Liquidity', sortType: 'number' },
  { key: 'poolAmount', title: 'Pool Amount', sortType: 'number' },
  { key: 'poolVariation', title: 'Pool Variation', sortType: 'number' },
  { key: 'poolRemaining', title: 'Pool Remaining', sortType: 'number' },
];

const tableDataExample = [
  {
    token: 'BabyPig',
    listedSince: '2021-07-05 11:37:12',
    actions: {
      unicrypt: '0xer39293',
      liveData: '0x94b0a3d511b6ecdb17ebf877278ab030acb0a878',
    },
    contractDetails: ['cash', 'plus'],
    tokenPrice: { usd: 0.32423, eth: 0.00000003 },
    totalLiquidity: 0.69,
    poolAmount: 6.33404,
    poolVariation: -22.31,
    poolRemaining: 6.70472,
  },
  {
    token: 'bezos',
    listedSince: '2021-07-20 13:48:43',
    actions: {
      uniswap: '0x543534gfdgdf',
      etherscan: '0x3423423dfs',
      unicrypt: '0xer39293',
      liveData: '0x284101622f5367fa9cf236da836726b8adc264fe',
    },
    contractDetails: ['plus'],
    tokenPrice: { usd: 0.32423, eth: 0.0000000376 },
    totalLiquidity: 3341154,
    poolAmount: 6.33404,
    poolVariation: 202.31,
    poolRemaining: 6.70472,
  },
  {
    token: 'elonmusk',
    listedSince: '2021-07-21 13:48:45',
    actions: {
      uniswap: '0x543534gfdgdf',
      etherscan: '0x3423423dfs',
      unicrypt: '0xer39293',
      liveData: '0x284101622f5367fa9cf236da836726b8adc264fe',
    },
    contractDetails: ['plus', 'lock'],
    tokenPrice: { usd: 1.32423, eth: 0.00000003 },
    totalLiquidity: 33330.769,
    poolAmount: 6.33404,
    poolVariation: 552.31,
    poolRemaining: 6.70472,
  },
  {
    token: 'jejdogo',
    listedSince: '2020-07-02 13:48:13',
    actions: {
      uniswap: '0x543534gfdgdf',
    },
    contractDetails: ['plus', 'lock', 'proxy', 'cash'],
    tokenPrice: { usd: 0.32423, eth: 0.00000003 },
    totalLiquidity: 31213.769,
    poolAmount: 6.33404,
    poolVariation: -2.31,
    poolRemaining: 6.70472,
  },
];

const BigSwapExplorer: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [tableData, setTableData] = useState([...tableDataExample]);

  useEffect(() => {
    const filtredTable = [...tableDataExample.filter((row) => row.token.includes(searchValue))];
    setTableData(filtredTable);
  }, [searchValue]);

  return (
    <main className={s.section}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>LiveNewPairs - LessTools</title>
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
            <div className={s.info_title}>Live New Pairs</div>
            <div className={s.info_subtitle}>Search for live new pairs and pool updates</div>
          </div>
          <div className={s.info_right}>
            <Search value={searchValue} onChange={setSearchValue} placeholder="Search" />
          </div>
        </div>
        {/*  eslint-disable-next-line */}
        {/* @ts-ignore */}
        <Table data={tableData} header={headerData} tableType="liveNewPairs" />
      </div>
    </main>
  );
};

export default BigSwapExplorer;
