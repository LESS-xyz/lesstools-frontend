import { useEffect, useState } from 'react';
import TradingViewWidget, { Themes, BarStyles } from 'react-tradingview-widget';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';
import moment from 'moment';

import { GET_PAIR_INFO, GET_PAIR_SWAPS } from '../../queries/index';
import { IRowPairExplorer } from '../../types/table';
import { IPairSwapsInfo } from '../../types/pairExplorer';
import AdBlock from '../../components/AdBlock/index';
import Table, { ITableHeader } from '../../components/Table/index';
import PairInfoHeader from './PairInfoCard/PairInfoHeader/index';
import PairInfoBody, { IPairInfo } from './PairInfoCard/PairInfoBody/index';
import PairInfoBottom from './PairInfoCard/PairInfoBottom/index';
import Search from '../../components/Search/index';
import { getTokenInfoFromCoingecko, IToken } from '../../api/getTokensInfoFromCoingecko';
import Loader from '../../components/Loader/index';

import s from './PairExplorer.module.scss';

import ad from '../../assets/img/sections/ad/ad1.png';
import filterIcon from '../../assets/img/icons/filter.svg';

const PairExplorer: React.FC = () => {
  const [bottomType, setBottomType] = useState<'tradeHistory' | 'myPositions' | 'priceAlerts'>(
    'tradeHistory',
  );
  const [tokenInfoFromCoingecko, setTokenInfoFromCoingecko] = useState<IToken | undefined>(
    {} as IToken,
  );
  const [searchValue, setSearchValue] = useState('');
  const { id: pairId } = useParams<{ id: string }>();

  // запрос на бэкенд для pair-card info
  const { loading, data: pairInfo } = useQuery<IPairInfo>(GET_PAIR_INFO, {
    variables: {
      id: pairId,
    },
  });

  // запрос на получения всех свапов данной пары
  type response = { swaps: Array<IPairSwapsInfo> };
  const { loading: loadingSwaps, data: swaps } = useQuery<response>(GET_PAIR_SWAPS, {
    variables: {
      id: pairId,
    },
  });

  // запрос на coingecko для получения иконки токена и полного названия
  useEffect(() => {
    if (!loading && pairInfo?.base_info) {
      const tokenToRequest =
        pairInfo.base_info.token1.symbol === 'WETH'
          ? pairInfo.base_info.token0.id
          : pairInfo.base_info.token1.id;
      getTokenInfoFromCoingecko(tokenToRequest || '').then((res) => setTokenInfoFromCoingecko(res));
    }
    // eslint-disable-next-line
  }, [loading, pairInfo]);

  const [swapsData, setSwapsData] = useState<Array<IRowPairExplorer>>([]);
  const [swapsHeader, setSwapsHeader] = useState<ITableHeader>([]);
  // формирования данных для таблицы
  useEffect(() => {
    if (!loadingSwaps && swaps !== undefined) {
      const data: Array<IRowPairExplorer> = swaps?.swaps.map((swap) => ({
        data: moment(+swap.timestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
        type: +swap.amount1Out === 0 ? 'sell' : 'buy',
        priceUsd: +swap.token1PriceUSD,
        priceEth: +swap.token1PriceETH,
        amountEth: +swap.amount1Out === 0 ? +swap.amount1In : +swap.amount1Out,
        totalEth: +swap.amount0Out || +swap.amount0In,
        maker: swap.from,
        others: { etherscan: swap.transaction.id },
      }));
      setSwapsData(data);

      const header: ITableHeader = [
        { key: 'data', title: 'Date', sortType: 'date' },
        { key: 'type', title: 'Type', sortType: 'string' },
        { key: 'priceUsd', title: 'Price USD', sortType: 'number' },
        { key: 'priceEth', title: 'Price ETH', sortType: 'number' },
        {
          key: 'amountEth',
          title: `Amount ${pairInfo?.base_info?.token1.symbol}`,
          sortType: 'number',
        },
        { key: 'totalEth', title: 'Total ETH', sortType: 'number' },
        { key: 'maker', title: 'Maker' },
        { key: 'Others', title: 'Others' },
      ];
      setSwapsHeader(header);
    }
    // eslint-disable-next-line
  }, [loadingSwaps, swaps, pairInfo?.base_info?.token1?.symbol]);

  return (
    <main className={s.page}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>PairExplorer - LessTools</title>
        <meta
          name="description"
          content="Multi-Chain Decentralized
Fundraising Capital"
        />
      </Helmet>

      <div className={s.container}>
        <AdBlock adImg={ad} />

        <div className={s.info}>
          {!pairInfo ? (
            <Loader />
          ) : (
            <PairInfoHeader
              token0={pairInfo?.base_info?.token0}
              token1={pairInfo?.base_info?.token1}
              pairId={pairId}
              tokenInfoFromCoingecko={tokenInfoFromCoingecko}
            />
          )}
          <Search placeholder="Search" value={searchValue} onChange={setSearchValue} />
        </div>

        <div className={s.main}>
          <div className={s.card}>
            {pairInfo ? <PairInfoBody loading={loading} pairInfo={pairInfo} /> : <Loader />}
          </div>
          <div className={s.chart}>
            <TradingViewWidget
              theme={Themes.DARK}
              autosize
              hide_side_toolbar={false}
              style={BarStyles.AREA}
              symbol={`${pairInfo?.base_info?.token0?.symbol}${pairInfo?.base_info?.token1?.symbol}`}
            />
          </div>
        </div>

        <div className={s.footer}>
          <PairInfoBottom likes={96.5} dislikes={3.5} votesAmount={845} />
        </div>
        <div className={s.table_info}>
          <div className={s.buttons}>
            <div
              tabIndex={0}
              onKeyDown={() => {}}
              role="button"
              onClick={() => setBottomType('tradeHistory')}
              className={`${s.buttons_item} ${bottomType === 'tradeHistory' && s.active}`}
            >
              Trade History
            </div>
            <div
              tabIndex={0}
              onKeyDown={() => {}}
              role="button"
              onClick={() => setBottomType('myPositions')}
              className={`${s.buttons_item} ${bottomType === 'myPositions' && s.active}`}
            >
              My Positions
            </div>
            <div
              tabIndex={0}
              onKeyDown={() => {}}
              role="button"
              onClick={() => setBottomType('priceAlerts')}
              className={`${s.buttons_item} ${bottomType === 'priceAlerts' && s.active}`}
            >
              Price Alerts
            </div>
          </div>
          <div className={s.last_trades}>
            <div className={s.last_trades__icon}>
              <img src={filterIcon} alt="filterIcon" />
            </div>
            <div className={s.last_trades__text}>
              {swaps?.swaps[0]?.pair.token1.symbol} (last {swaps?.swaps.length} trades)
            </div>
          </div>
        </div>

        {bottomType === 'tradeHistory' && (
          <Table data={swapsData} header={swapsHeader} tableType="pairExplorer" />
        )}
      </div>
    </main>
  );
};

export default PairExplorer;
