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
import { WHITELIST } from '../../data/whitelist';

import s from './BigSwapExplorer.module.scss';

import ad from '../../assets/img/sections/ad/ad1.png';
import loader from '../../assets/loader.svg';

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

  // table Data
  const [tableData, setTableData] = useState<Array<IRowBigSwap>>([]);

  // query big swaps
  type response = { swaps: Array<IBigSwapInfo> };
  const { loading, data: swapsData } = useQuery<response>(GET_BIG_SWAPS, {
    variables: { lowerThreshold: 10000 },
    pollInterval: 15000,
  });

  // для фильтрации
  // сначала приходит ответ с бэка, это сетается в setSwapsToTable,
  // после обработка и сетается в setTableData
  const [swapsFromBackend, setSwapsFromBackend] = useState<response>({ swaps: [] });
  useEffect(() => {
    if (swapsData) setSwapsFromBackend(swapsData);
  }, [swapsData]);

  // фильтрация
  useEffect(() => {
    if (searchValue) {
      const newSwaps = swapsData?.swaps.filter((data) => {
        if (
          data.pair.token0.symbol.includes(searchValue.toUpperCase()) ||
          data.pair.token1.symbol.includes(searchValue.toUpperCase())
        )
          return true;
        return false;
      });
      setSwapsFromBackend({ swaps: newSwaps || [] });
    } else setSwapsFromBackend(swapsData || { swaps: [] });
    // eslint-disable-next-line
  }, [searchValue, swapsData]);

  useEffect(() => {
    if (!loading && swapsData !== undefined) {
      const newData: Array<IRowBigSwap> = swapsFromBackend?.swaps.map((swap: IBigSwapInfo) => {
        // TBR = Token Being Reviewd
        const TBRSymbol = WHITELIST.includes(swap.pair.token1.id)
          ? swap.pair.token0.symbol
          : swap.pair.token1.symbol;
        const TBRindex = WHITELIST.includes(swap.pair.token1.symbol) ? '0' : '1';

        const TBRamountOut = swap[`amount${TBRindex}Out` as const];
        const TBRamountIn = swap[`amount${TBRindex}In` as const];
        const TBRreserve = `reserve${TBRindex}` as const;

        const TBRtype = +TBRamountOut === 0 ? 'sell' : 'buy';
        const TBRquantity = TBRtype === 'sell' ? +TBRamountIn : +TBRamountOut;

        const otherTokenIndex = TBRindex === '1' ? '0' : '1';

        return {
          pair: TBRSymbol,
          time: moment(+swap.timestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
          type: TBRtype,
          quantity: TBRquantity,
          totalEth:
            TBRtype === 'buy'
              ? +swap[`amount${otherTokenIndex}In` as const]
              : +swap[`amount${otherTokenIndex}Out` as const],
          totalUsd: +swap.amountUSD,
          change: (TBRquantity / +swap.pair[TBRreserve]) * 100,
          others: {
            liveData: swap.pair.id,
            etherscan: swap.transaction.id,
          },
        };
      });
      setTableData(newData);
    }
    // eslint-disable-next-line
  }, [loading, swapsFromBackend]);

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
        {loading && !swapsData ? (
          <img src={loader} alt="loader" />
        ) : (
          <Table data={tableData} header={headerData} tableType="bigSwap" />
        )}
      </div>
    </main>
  );
};

export default BigSwapExplorer;
