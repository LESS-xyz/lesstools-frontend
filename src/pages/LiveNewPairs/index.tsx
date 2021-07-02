import Table from '../../components/Table/index';
import s from '../BigSwapExplorer/BigSwapExplorer.module.scss';
// import otherIcon1 from '../../assets/img/icons/table/other-1.svg';
// import otherIcon2 from '../../assets/img/icons/table/other-2.svg';
import InfoBlock from '../../components/InfoBlock/index';
import Search from '../../components/Search/index';
import { useState } from 'react';

// headers for table
const headerData = [
  { key: 'token', title: 'Token' },
  { key: 'listedSince', title: 'Listed Since' },
  { key: 'actions', title: 'Actions' },
  { key: 'contractDetails', title: 'Contract Details' },
  { key: 'tokenPrice', title: 'Token Price USD (ETH)' },
  { key: 'totalLiquidity', title: 'Total Liquidity' },
  { key: 'poolAmount', title: 'Pool Amount' },
  { key: 'poolVariation', title: 'Pool Variation' },
  { key: 'poolRemaining', title: 'Pool Remaining' },
];

const tableData = [
  {
    token: 'CUM 1',
    listedSince: '2021-07-02 13:48:03',
    actions: ['icon', 'icon'],
    contractDetails: ['icon', 'icon'],
    tokenPrice: 0.0000000002227,
    totalLiquidity: 33.769,
    poolAmount: 6.33404,
    poolVariation: 22.31,
    poolRemaining: 6.70472,
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
            <div className={s.info_title}>Live New Pairs</div>
            <div className={s.info_subtitle}>Search for live new pairs and pool updates</div>
          </div>
          <div className={s.info_right}>
            <Search value={searchValue} onChange={setSearchValue} placeholder="Search" />
          </div>
        </div>

        <Table data={tableData} header={headerData} tableType="liveNewPairs" />
      </div>
    </main>
  );
};

export default BigSwapExplorer;
