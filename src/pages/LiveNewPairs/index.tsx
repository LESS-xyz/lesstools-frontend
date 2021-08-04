import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import Table, { ITableHeader } from '../../components/Table/index';
import InfoBlock from '../../components/InfoBlock/index';
import Search from '../../components/Search/index';
import AdBlock from '../../components/AdBlock/index';
import { GET_LIVE_SWAPS } from '../../queries/index';
import { INewPair } from '../../types/newPairs';
import { IRowLiveNewPairs } from '../../types/table';
import { WHITELIST } from '../../data/whitelist';

import s from '../BigSwapExplorer/BigSwapExplorer.module.scss';

import ad from '../../assets/img/sections/ad/ad1.png';
import loader from '../../assets/loader.svg';

// headers for table
const headerData: ITableHeader = [
  { key: 'token', title: 'Token', sortType: 'string' },
  { key: 'listedSince', title: 'Listed Since', sortType: 'number' },
  { key: 'actions', title: 'Actions' },
  { key: 'tokenPrice', title: 'Token Price', sortType: 'tokenPrice' },
  { key: 'totalLiquidity', title: 'Total Liquidity', sortType: 'number' },
  { key: 'poolAmount', title: 'Initial Pool Amount', sortType: 'number' },
  { key: 'poolVariation', title: 'Pool Variation', sortType: 'number' },
  { key: 'poolRemaining', title: 'Pool Remaining', sortType: 'number' },
];

const BigSwapExplorer: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  // final data for table
  const [tableData, setTableData] = useState<Array<IRowLiveNewPairs>>([]);

  // query new pairs
  type response = { pairs: Array<INewPair> };
  const { loading, data: liveSwaps } = useQuery<response>(GET_LIVE_SWAPS, {
    pollInterval: 15000,
  });

  // для фильтрации
  // сначала приходит ответ с бэка, это сетается в setSwapsFromBackend,
  // после обработка и сетается в setTableData
  const [swapsFromBackend, setSwapsFromBackend] = useState<response>({ pairs: [] });
  useEffect(() => {
    if (liveSwaps) setSwapsFromBackend(liveSwaps);
  }, [liveSwaps]);

  // фильтрация
  useEffect(() => {
    if (searchValue) {
      const newSwaps = liveSwaps?.pairs.filter((data) => {
        if (
          data.token0.symbol.includes(searchValue.toUpperCase()) ||
          data.token1.symbol.includes(searchValue.toUpperCase())
        )
          return true;
        return false;
      });
      setSwapsFromBackend({ pairs: newSwaps || [] });
    } else setSwapsFromBackend(liveSwaps || { pairs: [] });
    // eslint-disable-next-line
  }, [searchValue, liveSwaps]);

  console.log(searchValue);

  useEffect(() => {
    if (!loading && liveSwaps !== undefined) {
      const newData: Array<IRowLiveNewPairs> = swapsFromBackend?.pairs.map((swap: INewPair) => {
        // TBR = Token Being Reviewd
        const TBRSymbol = WHITELIST.includes(swap.token0.id)
          ? swap.token1.symbol
          : swap.token0.symbol;
        const TBRindex = WHITELIST.includes(swap.token0.id) ? '1' : '0';
        const TBRaddress = swap[`token${TBRindex}` as const].id;

        const otherTokenIndex = TBRindex === '1' ? '0' : '1';

        return {
          token: TBRSymbol,
          listedSince: swap.createdAtTimestamp,
          actions: {
            uniswap: TBRaddress,
            etherscan: swap.creationTxnHash,
            unicrypt: swap.id,
            liveData: swap.id,
          },
          tokenPrice: {
            usd: +swap[`token${TBRindex}` as const].derivedUSD,
            eth: +swap[`token${TBRindex}` as const].derivedETH,
          },
          totalLiquidity: +swap.reserveUSD,
          poolAmount: +swap[`initialReserve${otherTokenIndex}` as const],
          poolVariation:
            (+swap[`reserve${otherTokenIndex}` as const] * 100) /
              +swap[`initialReserve${otherTokenIndex}` as const] -
            100,
          poolRemaining: +swap[`reserve${otherTokenIndex}` as const],
          otherTokenSymbol: swap[`token${otherTokenIndex}` as const].symbol,
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
        {loading && liveSwaps === undefined ? (
          <img src={loader} alt="loader" />
        ) : (
          <Table data={tableData} header={headerData} tableType="liveNewPairs" />
        )}
      </div>
    </main>
  );
};

export default BigSwapExplorer;
