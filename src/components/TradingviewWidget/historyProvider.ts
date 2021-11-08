import axios from 'axios';

const api_root = 'https://min-api.cryptocompare.com';
const history: any = {};

// const lastBarsCache = new Map();

export default {
  history,

  getBars: async (symbolInfo: any, resolution: any, from: any, to: any, first: any, limit: any) => {
    try {
      const split_symbol = symbolInfo.name.split(/[:/]/);
      const url =
        // eslint-disable-next-line no-nested-ternary
        resolution === 'D'
          ? '/data/histoday'
          : resolution >= 60
          ? '/data/histohour'
          : '/data/histoday';
      const params = {
        fsym: split_symbol[0],
        tsym: split_symbol[1],
        limit: limit || 2000,
      };
      console.log('TradingviewWidget historyprovider:', { params });

      const result = await axios.get(`${api_root}${url}`, { params });
      const { data } = result;
      console.log('TradingviewWidget historyprovider:', { data });
      if (data.Response && data.Response === 'Error') {
        console.log('TradingviewWidget historyprovider CryptoCompare API error:', data.Message);
        return [];
      }
      if (data.Data.length) {
        console.log(
          `TradingviewWidget historyprovider actually returned: ${new Date(
            data.TimeFrom * 1000,
          ).toISOString()} - ${new Date(data.TimeTo * 1000).toISOString()}`,
        );
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
        console.log('TradingviewWidget historyprovider:', { bars });
        return bars;
      }
      return [];
    } catch (e) {
      console.error('TradingviewWidget historyprovider:', e);
      return [];
    }
  },
};
