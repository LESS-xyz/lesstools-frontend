import { useEffect, useState, useCallback, useMemo } from 'react';
import TradingViewWidget, { Themes, BarStyles } from 'react-tradingview-widget';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';

import {
  GET_PAIR_INFO,
  GET_PAIR_SWAPS,
  GET_BLOCK_24H_AGO,
  GET_PAIR_INFO_SUSHIWAP,
} from '../../queries/index';
import RightAsideBar from './RightAsideBar/index';
import { IRowPairExplorer } from '../../types/table';
import PairInfoHeader from './PairInfoCard/PairInfoHeader/index';
import PairInfoBody from './PairInfoCard/PairInfoBody/index';
import PairsSearch from '../../components/PairsSearch/index';
import Loader from '../../components/Loader/index';
import Favorites from './RightAsideBar/Favorites/index';
import { WHITELIST } from '../../data/whitelist';
import { getBlockClient } from '../../index';
import { useMst } from '../../store/store';
import backend, { IAdditionalInfoFromBackend } from '../../services/backend/index';
import { useGetDataForAllExchanges } from '../../hooks/useGetDataForAllExchanges';

import s from './PairExplorer.module.scss';
import arrowRight from '../../assets/img/icons/arrow-right.svg';
import { Exchanges } from '../../config/exchanges';

const PairExplorer: React.FC = () => {
  const [tokenInfoFromBackend, setTokenInfoFromBackend] =
    useState<null | IAdditionalInfoFromBackend>(null);
  const [timestamp24hAgo] = useState(Math.round(Date.now() / 1000) - 24 * 3600);
  const [swaps, setSwaps] = useState<any[]>([]);
  const { id: pairId } = useParams<{ id: string }>();
  const { user } = useMst();
  const location = useLocation();

  const network = location.pathname.split('/')[1];
  const exchange = 'uniswap';

  const isExchange = useCallback(
    (v: string) => exchange.toLowerCase() === v.toLowerCase(),
    [exchange],
  );

  // TODO: перенести запрос на номер блока в общий компонент и хранить в сторе?
  // ⚠️ ATTENTION timestap hardcode due our subgraph is still indexing the blockchain
  // запрос на граф для получения номера блока 24 часа назад
  const { data: blocks } = useQuery(GET_BLOCK_24H_AGO, {
    client: getBlockClient,
    variables: {
      timestamp: isExchange(Exchanges.Sushiswap) ? timestamp24hAgo : 1599000000,
    },
  });

  // запрос для pair-card info [ГРАФ]
  const [pairInfoFromAllExchanges, getPairInfoFromAllExchanges] = useGetDataForAllExchanges({
    network,
    defaultData: [],
    query: isExchange(Exchanges.Sushiswap) ? GET_PAIR_INFO_SUSHIWAP : GET_PAIR_INFO,
    variables: {
      id: pairId,
      blockNumber: (blocks && +blocks?.blocks[0]?.number) || 10684814,
    },
  });
  console.log('PairExplorer:', { pairInfoFromAllExchanges, network });

  const pairInfo = useMemo(
    () => pairInfoFromAllExchanges.map((item: any) => item.data)[0] || {},
    [pairInfoFromAllExchanges],
  );

  // рефетч при изменение id пары или номер блока (24 часа назад) [ГРАФ]
  useEffect(() => {
    if (!pairId) return;
    if (!blocks) return;
    if (!network) return;
    getPairInfoFromAllExchanges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks, pairId, network]);

  // запрос на получения всех свапов данной пары [ГРАФ]
  const [swapsFromAllExchanges, getSwapsFromAllExchanges] = useGetDataForAllExchanges({
    network,
    defaultData: [],
    query: GET_PAIR_SWAPS,
    variables: { id: pairId },
  });

  useEffect(() => {
    if (!pairId) return;
    getSwapsFromAllExchanges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairId]);

  const filterSwaps = useCallback(async () => {
    try {
      let swapsNew: any[] = [];
      swapsFromAllExchanges.map((item: any) => {
        if (!item) return null;
        if (!item.data) return null;
        const { swaps: swapsOfExchange } = item.data;
        swapsNew = swapsNew.concat(swapsOfExchange);
        return null;
      });
      console.log('PairExplorer getPairSwaps:', swapsNew);
      setSwaps(swapsNew);
    } catch (e) {
      console.error(e);
    }
  }, [swapsFromAllExchanges]);

  useEffect(() => {
    if (!swapsFromAllExchanges || !swapsFromAllExchanges.length) return;
    filterSwaps();
  }, [swapsFromAllExchanges, filterSwaps]);

  // запрос на бэк для доп.инфы по паре
  useEffect(() => {
    if (!pairInfo.base_info) return;
    console.log('PairExplorer useEffect:', { pairId, blocks, pairInfo });
    const tbr = WHITELIST.includes(pairInfo.base_info.token1.id)
      ? pairInfo?.base_info.token0
      : pairInfo?.base_info.token1;
    backend
      .getTokenPairAdditionalData({
        pair_address: pairId,
        token_address: tbr.id,
        token_symbol: tbr.symbol,
        token_name: tbr.name,
        platform: 'ETH',
      })
      .then((res) => setTokenInfoFromBackend(res.data));
  }, [blocks, pairInfo, pairId, user.isVerified]);

  const [swapsData, setSwapsData] = useState<Array<IRowPairExplorer>>([]);

  // формирования данных для таблицы
  useEffect(() => {
    if (!swaps.length) return;
    const data: Array<IRowPairExplorer> = swaps.map((swap: any) => {
      const TBRindex = WHITELIST.includes(swap.pair.token1.id) ? '0' : '1';
      const OtherIndex = TBRindex === '1' ? '0' : '1';

      return {
        data: +swap.timestamp * 1000,
        tbr: swap.pair[`token${TBRindex}` as const],
        otherToken: swap.pair[`token${OtherIndex}` as const],
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
  }, [swaps]);

  const [isLeftSideBar, setIsLeftSideBar] = useState(true);
  const [isRightSideBar, setIsRightSideBar] = useState(true);

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
        <div className={s.main}>
          <div className={s.mobile_block}>
            <PairsSearch placeholder={`Search ${exchange} pairs`} />
            <div className={s.mobile_block__favs}>
              <Favorites />
            </div>
            {!pairInfo ? (
              <Loader />
            ) : (
              <PairInfoHeader
                token0={pairInfo?.base_info?.token0}
                token1={pairInfo?.base_info?.token1}
                cmcTokenId={tokenInfoFromBackend?.pair?.token_being_reviewed?.cmc_id || null}
              />
            )}
          </div>

          <div
            className={`${s.main_inner} ${isLeftSideBar && s.withLeft} ${
              isRightSideBar && s.withRight
            } ${isLeftSideBar && isRightSideBar && s.both}`}
          >
            <aside className={`${s.left_aside} ${isLeftSideBar && s.active}`}>
              <div className={s.left}>
                <div className={`${s.left_inner} grey-scroll`}>
                  {pairInfo ? (
                    <PairInfoBody
                      loading={!pairInfo}
                      pairId={pairId}
                      tokenInfoFromBackend={tokenInfoFromBackend}
                      pairInfo={pairInfo}
                      exchange={exchange}
                    />
                  ) : (
                    <Loader />
                  )}
                </div>
                <div
                  className={s.left_aside__button}
                  tabIndex={0}
                  role="button"
                  onKeyDown={() => {}}
                  onClick={() => setIsLeftSideBar(!isLeftSideBar)}
                >
                  <div className={s.left_aside__button_inner}>
                    <img src={arrowRight} alt=">" />
                  </div>
                </div>
              </div>
            </aside>
            <div className={s.center}>
              <div className={s.info}>
                {!pairInfo ? (
                  <Loader />
                ) : (
                  <PairInfoHeader
                    token0={pairInfo?.base_info?.token0}
                    token1={pairInfo?.base_info?.token1}
                    cmcTokenId={tokenInfoFromBackend?.pair?.token_being_reviewed?.cmc_id || 0}
                  />
                )}
                <PairsSearch placeholder={`Search ${exchange} pairs`} />
              </div>
              <div className={s.chart}>
                <TradingViewWidget
                  theme={Themes.DARK}
                  autosize
                  hide_side_toolbar={false}
                  style={BarStyles.CANDLES}
                  symbol={`${
                    WHITELIST.includes(pairInfo?.base_info?.token1.id || '')
                      ? pairInfo?.base_info?.token0?.symbol
                      : pairInfo?.base_info?.token1?.symbol
                  }USD`}
                  allow_symbol_change={false}
                />
              </div>
            </div>
            <aside className={`${s.right_aside} ${isRightSideBar && s.active}`}>
              <div className={s.right}>
                <div className={s.right_inner}>
                  <RightAsideBar trades={swapsData} />
                </div>
                <div
                  className={s.right_aside__button}
                  tabIndex={0}
                  role="button"
                  onKeyDown={() => {}}
                  onClick={() => setIsRightSideBar(!isRightSideBar)}
                >
                  <div className={s.right_aside__button_inner}>
                    <img src={arrowRight} alt=">" />
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PairExplorer;
