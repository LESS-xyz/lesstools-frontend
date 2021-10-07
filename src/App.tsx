import { useCallback, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useMst } from './store/store';
import { BigSwapExplorer, LiveNewPairs, PairExplorer, BoardPage, UserAccount } from './pages';

import HotPairs from './components/CommonQueries/HotPairs';
import Footer from './components/Footer/index';
import Sidebar from './components/Sidebar/index';
import InfoBlock from './components/InfoBlock';
import MobileHeader from './components/MobileHeader';
import { GET_HOT_PAIRS, GET_HOT_PAIRS_SUSHISWAP } from './queries';
import TheGraph from './services/TheGraph';
import { SubgraphsByExchangeShort } from './config/subgraphs';
import { ExchangesByNetworks, isExchangeLikeSushiswap } from './config/exchanges';
import { Networks } from './config/networks';
import { WHITELIST } from './data/whitelist';
import { useStoreContext } from './contexts/MobxConnector';
import { newObject } from './utils/formatDataTypes';
import { getStartOfHour } from "./utils/time";

interface IToken {
  id: string;
  symbol: string;
  derivedUSD: string;
}

export interface IPairFromGraph {
  hourlyTxns: string;
  pair: {
    id: string;
    token0: IToken;
    token1: IToken;
  };
}

export const App: React.FC = observer((props: any) => {
  const { mobileMenu } = useMst();
  const { store, setHotPairs } = useStoreContext();

  // const concatenate = (network: string, data: any[] = []) => {
  //   try {
  //     const exchanges = ExchangesByNetworks[network] || [];
  //     const exchangesOfNetwork = Object.values(exchanges);
  //     let pairsNew: any[] = [];
  //     data.map((item: any, i: number) => {
  //       if (!item) return null;
  //       let { pairs } = item;
  //       const exchange = exchangesOfNetwork[i];
  //       pairs = pairs.map((pair: any) => {
  //         return { ...pair, exchange };
  //       });
  //       pairsNew = pairsNew.concat(pairs || []);
  //       return null;
  //     });
  //     console.log('App concatenate:', pairsNew);
  //     return pairsNew;
  //   } catch (e) {
  //     console.error('App concatenate:', e);
  //     return [];
  //   }
  // };

  function formatData(pair: any) {
    try {
      const pairsSumma: { [key: string]: IPairFromGraph } = {};
      const addPairToSumm = (info: IPairFromGraph) => {
        const tbr = WHITELIST.includes(info.pair.token0.id) ? info.pair.token1 : info.pair.token0;
        if (tbr.symbol in pairsSumma) {
          const newInfo = { ...info };
          newInfo.hourlyTxns = (+info.hourlyTxns + +pairsSumma[tbr.symbol].hourlyTxns).toString();
          pairsSumma[tbr.symbol] = newInfo;
        } else pairsSumma[tbr.symbol] = info;
      };
      pair.currentHour.forEach((info: IPairFromGraph) => addPairToSumm(info));
      pair.oneHour.forEach((info: IPairFromGraph) => addPairToSumm(info));
      pair.twoHours.forEach((info: IPairFromGraph) => addPairToSumm(info));
      const finalData = Object.values(pairsSumma)
        .sort((a: IPairFromGraph, b: IPairFromGraph) => +b.hourlyTxns - +a.hourlyTxns)
        .filter(
          (el) => !(WHITELIST.includes(el.pair.token0.id) && WHITELIST.includes(el.pair.token1.id)),
        );
      return finalData;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  const getDataForAllExchangesOfNetwork = useCallback(
    async (network: string) => {
      try {
        const exchanges = ExchangesByNetworks[network] || [];
        const exchangesOfNetwork = Object.values(exchanges);
        if (!exchangesOfNetwork.length) return;
        const results = exchangesOfNetwork.map((exchangeOfNetwork: any) => {
          return TheGraph.query({
            subgraph: SubgraphsByExchangeShort[exchangeOfNetwork],
            query: isExchangeLikeSushiswap(exchangeOfNetwork)
              ? GET_HOT_PAIRS_SUSHISWAP
              : GET_HOT_PAIRS,
            variables: isExchangeLikeSushiswap(exchangeOfNetwork)
              ? {
                  timestamp1: getStartOfHour(),
                  timestamp2: getStartOfHour() - 3600,
                  timestamp3: getStartOfHour() - 7200,
                }
              : {
                  timestamp1: 1598338800,
                  timestamp2: 1598338800 - 3600,
                  timestamp3: 1598338800 - 7200,
                },
          });
        });
        const result = await Promise.all(results);
        const resultsFormatted: any[] = result.map((pair: any) => formatData(pair));
        const resultsContatenated = [].concat(...resultsFormatted);
        const resultsSorted = resultsContatenated.sort((a: any, b: any) => +b.hourlyTxns - +a.hourlyTxns);
        console.log('App getDataForAllExchangesOfNetwork:', {
          network,
          result,
          resultsFormatted,
          resultsContatenated,
        });
        // setHotPairs({ [network]: resultsContatenated });
        setHotPairs({ [network]: resultsSorted });
      } catch (e) {
        console.error('App getDataForAllExchangesOfNetwork:', e);
      }
    },
    [setHotPairs],
  );

  useEffect(() => {
    getDataForAllExchangesOfNetwork(Networks.Binance);
    getDataForAllExchangesOfNetwork(Networks.Ethereum);
    getDataForAllExchangesOfNetwork(Networks.Polygon);
    getDataForAllExchangesOfNetwork(Networks.Avalanche);
    getDataForAllExchangesOfNetwork(Networks.Xdai);
    getDataForAllExchangesOfNetwork(Networks.Fantom);
  }, [getDataForAllExchangesOfNetwork]);

  useEffect(() => {
    console.log('App store:', newObject(store.hotPairs));
  }, [store.hotPairs]);

  useEffect(() => {
    const body = document.querySelector('body');
    if (mobileMenu.isActive) body?.classList.add('fixed');
    else body?.classList.remove('fixed');
  }, [mobileMenu.isActive, props]);

  return (
    <div className="App">
      <HotPairs />
      <MobileHeader />
      <Sidebar />
      <Route
        path={[
          // '/sushiswap',
          // '/uniswap',
          '/ethereum',
          '/binance',
          '/polygon',
        ]}
      >
        <InfoBlock />
      </Route>

      <Switch>
        <Route exact path="/">
          <BoardPage />
        </Route>
        <Route
          exact
          path={[
            // '/sushiswap/big-swap-explorer',
            // '/uniswap/big-swap-explorer',
            '/ethereum/big-swap-explorer',
            '/binance/big-swap-explorer',
            '/polygon/big-swap-explorer',
          ]}
        >
          <BigSwapExplorer />
        </Route>
        <Route
          exact
          path={[
            // '/sushiswap/live-new-pairs',
            // '/uniswap/live-new-pairs',
            '/ethereum/live-new-pairs',
            '/binance/live-new-pairs',
            '/polygon/live-new-pairs',
          ]}
        >
          <LiveNewPairs />
        </Route>
        <Route
          path={[
            // '/sushiswap/pair-explorer/:id',
            // '/uniswap/pair-explorer/:id',
            // '/quickswap/pair-explorer/:id',
            '/ethereum/pair-explorer/:id',
            '/binance/pair-explorer/:id',
            '/polygon/pair-explorer/:id',
          ]}
        >
          <PairExplorer />
        </Route>
        <Route path="/user-account">
          <UserAccount />
        </Route>
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div>
  );
});
