import { useEffect, useState } from 'react';
import TradingViewWidget, { Themes, BarStyles } from 'react-tradingview-widget';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';
import moment from 'moment';

import {
  GET_PAIR_INFO,
  GET_PAIR_SWAPS,
  GET_BLOCK_24H_AGO,
  GET_PAIR_INFO_SUSHIWAP,
} from '../../queries/index';
import { IRowPairExplorer } from '../../types/table';
import { IPairSwapsInfo } from '../../types/pairExplorer';
import Table, { ITableHeader } from '../../components/Table/index';
import PairInfoHeader from './PairInfoCard/PairInfoHeader/index';
import PairInfoBody, { IPairInfo } from './PairInfoCard/PairInfoBody/index';
import PairsSearch from '../../components/PairsSearch/index';
import InfoBlock from '../../components/InfoBlock/index';
import { getTokenInfoFromCoingecko, IToken } from '../../api/getTokensInfoFromCoingecko';
import Loader from '../../components/Loader/index';
import { WHITELIST } from '../../data/whitelist';
import { getBlockClient, uniswapSubgraph, sushiswapSubgraph } from '../../index';
import { useMst } from '../../store/store';

import s from './PairExplorer.module.scss';

const PairExplorer: React.FC = () => {
  const [tokenInfoFromCoingecko, setTokenInfoFromCoingecko] = useState<IToken | undefined>(
    {} as IToken,
  );
  const [searchValue, setSearchValue] = useState('');
  const { id: pairId } = useParams<{ id: string }>();
  const { currentExchange } = useMst();

  // TODO: перенести запрос на номер блока в общий компонент и хранить в сторе?
  // ⚠️ ATTENTION timestap hardcode due our subgraph is still indexing the blockchain
  // запрос на граф для получения номера блока 24 часа назад
  const { data: blocks } = useQuery(GET_BLOCK_24H_AGO, {
    client: getBlockClient,
    variables: {
      timestamp: 1599000000,
    },
  });

  // запрос на граф для pair-card info
  const { loading, data: pairInfo, refetch: refetchPairInfo } = useQuery<IPairInfo>(
    currentExchange.exchange === 'uniswap' ? GET_PAIR_INFO : GET_PAIR_INFO_SUSHIWAP,
    {
      variables: {
        id: pairId,
        blockNumber: (blocks && +blocks?.blocks[0]?.number) || 10684814,
      },
      client: currentExchange.exchange === 'uniswap' ? uniswapSubgraph : sushiswapSubgraph,
    },
  );

  useEffect(() => {
    refetchPairInfo();
  }, [blocks, refetchPairInfo]);

  // запрос на получения всех свапов данной пары
  type response = { swaps: Array<IPairSwapsInfo> };
  const { loading: loadingSwaps, data: swaps } = useQuery<response>(GET_PAIR_SWAPS, {
    variables: {
      id: pairId,
    },
    client: currentExchange.exchange === 'uniswap' ? uniswapSubgraph : sushiswapSubgraph,
  });

  // запрос на coingecko для получения иконки токена и полного названия
  useEffect(() => {
    if (!loading && pairInfo?.base_info) {
      const tokenToRequest = WHITELIST.includes(pairInfo.base_info.token1.id)
        ? pairInfo.base_info.token0.id
        : pairInfo.base_info.token1.id;
      getTokenInfoFromCoingecko(tokenToRequest).then((res) => setTokenInfoFromCoingecko(res));
    }
    // eslint-disable-next-line
  }, [loading, pairInfo]);

  const [swapsData, setSwapsData] = useState<Array<IRowPairExplorer>>([]);
  const [swapsHeader, setSwapsHeader] = useState<ITableHeader>([]);
  // формирования данных для таблицы
  useEffect(() => {
    if (!loadingSwaps && swaps !== undefined) {
      // TODO: FIX TBR TOKEN VIEW
      const data: Array<IRowPairExplorer> = swaps?.swaps.map((swap) => {
        const TBRindex = WHITELIST.includes(swap.pair.token1.id) ? '0' : '1';
        const OtherIndex = TBRindex === '1' ? '0' : '1';

        return {
          data: moment(+swap.timestamp * 1000).format('YYYY-MM-DD HH:mm:ss'),
          type: +swap[`amount${TBRindex}Out` as const] === 0 ? 'sell' : 'buy',
          priceUsd: +swap[`token${TBRindex}PriceUSD` as const],
          priceEth: +swap[`token${TBRindex}PriceETH` as const],
          amountEth:
            +swap[`amount${TBRindex}Out` as const] === 0
              ? +swap[`amount${TBRindex}In` as const]
              : +swap[`amount${TBRindex}Out` as const],
          totalEth:
            +swap[`amount${OtherIndex}Out` as const] || +swap[`amount${OtherIndex}In` as const],
          maker: swap.from,
          others: { etherscan: swap.transaction.id },
        };
      });
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

  // ⚠️HARDCODE
  const userAdress = '0x1414b85fe8570780e2b3468588e4dcdd901a76a2';

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
        <meta
          property="og:image"
          content="https://og-image.vercel.app/Check%20**WETH%20400%24**%20at%20lesstools.io.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fs2.coinmarketcap.com%2Fstatic%2Fimg%2Fcoins%2F200x200%2F10279.png&images=https%3A%2F%2Fs2.coinmarketcap.com%2Fstatic%2Fimg%2Fcoins%2F200x200%2F10279.png"
        />
      </Helmet>

      <div className={s.container}>
        <InfoBlock />

        <div className={s.main}>
          <div className={s.main_inner}>
            <div className={s.left}>
              <div className={s.left_inner}>
                {pairInfo ? (
                  <PairInfoBody
                    loading={loading}
                    pairId={pairId}
                    tokenInfoFromCoingecko={tokenInfoFromCoingecko}
                    pairInfo={pairInfo}
                  />
                ) : (
                  <Loader />
                )}
              </div>
            </div>
            <div className={s.center}>
              <div className={s.info}>
                {!pairInfo ? (
                  <Loader />
                ) : (
                  <PairInfoHeader
                    token0={pairInfo?.base_info?.token0}
                    token1={pairInfo?.base_info?.token1}
                    tokenInfoFromCoingecko={tokenInfoFromCoingecko}
                  />
                )}
                <PairsSearch
                  value={searchValue}
                  setValue={setSearchValue}
                  placeholder={`Search ${currentExchange.exchange} pairs by symbol/pair contract`}
                />
              </div>
              <div className={s.chart}>
                <TradingViewWidget
                  allowfullscreen
                  theme={Themes.DARK}
                  autosize
                  hide_side_toolbar={false}
                  style={BarStyles.AREA}
                  // TODO: fix pair (add weth or thether ?)
                  symbol={`${pairInfo?.base_info?.token0?.symbol}${pairInfo?.base_info?.token1?.symbol}`}
                />
              </div>
            </div>

            <div className={s.right}>
              <div className={s.right_inner}>right</div>
            </div>

            {/* нижняя часть страницы */}
            <Table data={swapsData} header={swapsHeader} tableType="pairExplorer" />
            <Table
              data={swapsData.filter((row) => row.maker === userAdress)}
              header={swapsHeader}
              tableType="pairExplorer"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PairExplorer;
