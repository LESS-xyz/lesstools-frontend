import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import moment from 'moment';

import Table, { ITableHeader } from '../../components/Table/index';
import InfoBlock from '../../components/InfoBlock/index';
import Search from '../../components/Search/index';
import AdBlock from '../../components/AdBlock/index';
import { IRowBigSwap } from '../../types/table';
import { GET_BIG_SWAPS } from '../../queries/index';
import { IBigSwapInfo } from '../../types/bigSwap';

import s from './BigSwapExplorer.module.scss';

import ad from '../../assets/img/sections/ad/ad1.png';

// headers for table
const headerData: ITableHeader = [
  { key: 'pair', title: 'Pair', sortType: 'string' },
  { key: 'time', title: 'Time', sortType: 'date' },
  { key: 'type', title: 'Type', sortType: 'string' },
  { key: 'quantity', title: 'Quantity', sortType: 'number' },
  { key: 'totalEth', title: 'Total ETH', sortType: 'number' },
  { key: 'totalUsd', title: 'Total USD', sortType: 'number' },
  { key: 'change', title: 'Change', sortType: 'number' },
  { key: 'others', title: 'Others' },
];

const BigSwapExplorer: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const [tableData, setTableData] = useState<Array<IRowBigSwap>>([]);

  // useEffect(() => {
  //   const filtredTable = [...exampleTableData.filter((row) => row.pair.includes(searchValue))];
  //   setTableData(filtredTable);
  // }, [searchValue]);

  // query big swaps
  type response = { swaps: Array<IBigSwapInfo> };
  const { loading, data: swapsData } = useQuery<response>(GET_BIG_SWAPS, {
    variables: { lowerThreshold: 10000 },
    pollInterval: 15000,
  });

  useEffect(() => {
    if (!loading && swapsData !== undefined) {
      // TODO: правильно прокинуть данные!
      const newData: Array<IRowBigSwap> = swapsData?.swaps.map((swap: IBigSwapInfo) => ({
        pair: swap.pair.token1.symbol,
        time: moment(+swap.timestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
        type: +swap.amount1Out === 0 ? 'sell' : 'buy',
        quantity: +swap.amount1Out === 0 ? +swap.amount1In : +swap.amount1Out,
        totalEth: +swap.amount1Out === 0 ? +swap.amount0Out : +swap.amount0In,
        totalUsd: +swap.amountUSD,
        change: 22.31,
        others: {
          liveData: swap.pair.id,
          etherscan: swap.transaction.id,
        },
      }));
      setTableData(newData);
    }
  }, [loading, swapsData]);

  console.log(loading, swapsData);

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
