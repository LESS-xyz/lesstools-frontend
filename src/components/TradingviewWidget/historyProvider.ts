import axios from 'axios';

const api_root = 'https://min-api.cryptocompare.com';
const history: any = {};
const api_key = process.env.REACT_APP_CRYPTOCOMPARE_API_KEY;
// TODO: не читается API ключ
console.log(api_key);

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
    try {
      const split_symbol = symbolInfo.name.split(/[:/]/);
      const url = resolution >= 60 ? '/data/histohour' : '/data/histoday';
      const params = {
        fsym: split_symbol[0],
        tsym: split_symbol[1],
        limit: limit || 2000,
        api_key,
      };

      const result = await axios.get(`${api_root}${url}`, { params });
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

          return newBars.data.Data.map((el: any) => {
            return {
              time: el.time * 1000, // TradingView requires bar time in ms
              low: el.low,
              high: el.high,
              open: el.open,
              close: el.close,
              volume: el.volumefrom,
            };
          });
        }

        return [];
      }

      if (data.Data.length) {
        const bars = data.Data.map((el: any) => {
          return {
            time: el.time * 1000, // TradingView requires bar time in ms
            low: el.low,
            high: el.high,
            open: el.open,
            close: el.close,
            volume: el.volumefrom,
          };
        });
        if (first) {
          const lastBar = bars[bars.length - 1];
          history[symbolInfo.name] = { lastBar };
        }
        return bars;
      }
      return [];
    } catch (e) {
      return [];
    }
  },
};
