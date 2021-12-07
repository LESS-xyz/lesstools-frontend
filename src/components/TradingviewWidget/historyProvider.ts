import axios from 'axios';

import rootStore from '../../store/store';
import backend from '../../services/backend';
import { REACT_APP_CRYPTOCOMPARE_API_KEY } from '../../config/index';
import { TradingviewExchangesNames } from '../../config/exchanges';

const api_root = 'https://min-api.cryptocompare.com';
const history: any = {};
const api_key = REACT_APP_CRYPTOCOMPARE_API_KEY;

interface IExchange {
  [key: string]: {
    markets: Array<string>;
  };
}

interface IExchanges {
  [key: string]: IExchange;
}

const findExchangeForPair = (exchanges: IExchanges, firstSymbolInPair: string) => {
  if (exchanges[firstSymbolInPair]) {
    const secondSymbolsInPair = exchanges[firstSymbolInPair];
    const symbolWithUsd = Object.keys(secondSymbolsInPair).find(
      (symbol) => symbol.startsWith('USD') || symbol.endsWith('USD'),
    );

    if (symbolWithUsd) {
      return {
        symbols: [firstSymbolInPair, symbolWithUsd],
        exchange: secondSymbolsInPair[symbolWithUsd].markets[0],
      };
    }

    const secondSymbol = Object.keys(secondSymbolsInPair)[0];
    return {
      symbols: [firstSymbolInPair, secondSymbol],
      exchange: secondSymbolsInPair[secondSymbol].markets[0],
    };
  }

  return null;
};

export default {
  history,

  getBars: async (symbolInfo: any, resolution: any, from: any, to: any, first: any, limit: any) => {
    if (!first) return [];
    try {
      const split_symbol: Array<string> = symbolInfo.name.split(/[:/]/);
      // query data from our api
      if (!split_symbol[1].includes('USD')) {
        const locationPathname = window.location.pathname.split('/');
        const pair_id = locationPathname[locationPathname.length - 1];
        const pool = TradingviewExchangesNames[rootStore.currentExchange.exchange] || 'mainnet';

        const candlesFromBackend = await backend.getCandlesFromOurBackned({
          pair_id,
          pool,
          time_interval: 'hour',
          candles: 240,
        });

        const formattedCandles = Object.values(candlesFromBackend.data)
          .reduce((res: Array<any>, el: any) => {
            if (el.open) {
              res.push({
                time: el.start_time * 1000, // TradingView requires bar time in ms
                low: el.low,
                high: el.high,
                open: el.open,
                close: el.close,
              });
            }

            return res;
          }, [])
          .reverse();

        return formattedCandles;
      }

      const url = resolution >= 60 ? '/data/histohour' : '/data/histoday';
      const params = {
        fsym: split_symbol[0],
        tsym: split_symbol[1],
        limit: limit || 2000,
        api_key,
      };

      const result = await axios.get(`${api_root}${url}`, { params });
      const olderData = await axios.get(`${api_root}${url}`, {
        params: { ...params, toTs: result.data.TimeFrom },
      });

      const { data } = result;

      if (data.Response && data.Response === 'Error') {
        const exchanges = await axios.get(`${api_root}/data/cccagg/pairs/excluded`);
        const newRequestData = findExchangeForPair(exchanges.data.Data, split_symbol[0]);
        if (newRequestData) {
          const newBars = await axios.get(`${api_root}${url}`, {
            params: {
              fsym: newRequestData.symbols[0],
              tsym: newRequestData.symbols[1],
              limit: limit || 2000,
              api_key,
              e: newRequestData.exchange,
            },
          });

          return newBars.data.Data.reduce((res: Array<any>, el: any) => {
            if (el.open !== 0) {
              res.push({
                time: el.time * 1000, // TradingView requires bar time in ms
                low: el.low,
                high: el.high,
                open: el.open,
                close: el.close,
                volume: el.volumefrom,
              });
            }

            return res;
          }, []);
        }

        rootStore.modals.open('Info', 'Not enough data to display the graph or very little');
        return [];
      }

      if (data.Data.length) {
        const bars = [...olderData.data.Data, ...data.Data].reduce((res: Array<any>, el: any) => {
          if (el.open !== 0) {
            res.push({
              time: el.time * 1000, // TradingView requires bar time in ms
              low: el.low,
              high: el.high,
              open: el.open,
              close: el.close,
              volume: el.volumefrom,
            });
          }

          return res;
        }, []);

        if (first) {
          const lastBar = bars[bars.length - 1];
          history[symbolInfo.name] = { lastBar };
        }
        return bars;
      }
      rootStore.modals.open('Info', 'Not enough data to display the graph or very little');
      return [];
    } catch (e) {
      rootStore.modals.open('Info', 'Not enough data to display the graph or very little');
      return [];
    }
  },
};
