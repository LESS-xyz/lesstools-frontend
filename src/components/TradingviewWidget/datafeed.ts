import historyProvider from './historyProvider';

const config = {
  supported_resolutions: ['60', 'D'],
};

export default {
  onReady: (callback: any) => {
    console.log('Tradingview Datafeed onReady:');
    setTimeout(() => callback(config), 0);
  },

  searchSymbols: (userInput: any, exchange: any, symbolType: any, onResultReadyCallback: any) => {
    console.log('Tradingview Datafeed searchSymbols:', {
      userInput,
      exchange,
      symbolType,
      onResultReadyCallback,
    });
  },

  resolveSymbol: (symbolName: any, onSymbolResolvedCallback: any, onResolveErrorCallback: any) => {
    try {
      // expects a symbolInfo object in response
      console.log('Tradingview Datafeed resolveSymbol:', {
        symbolName,
        onSymbolResolvedCallback,
        onResolveErrorCallback,
      });
      console.log('Tradingview Datafeed resolveSymbol:', { symbolName });
      const split_data = symbolName.split(/[:/]/);
      console.log('Tradingview Datafeed resolveSymbol:', { split_data });
      const symbolInfo = {
        name: symbolName,
        full_name: symbolName,
        pro_name: symbolName,
        description: '',
        type: 'crypto',
        session: '24x7',
        timezone: 'Etc/UTC',
        ticker: symbolName,
        exchange: split_data[0],
        minmov: 1,
        pricescale: 100000000,
        has_intraday: true,
        has_no_volume: false,
        has_weekly_and_monthly: true,
        intraday_multipliers: ['1', '60'],
        supported_resolution: config.supported_resolutions,
        volume_precision: 8,
        data_status: 'streaming',
      };

      if (split_data[1].match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) {
        symbolInfo.pricescale = 100;
      }
      setTimeout(function () {
        onSymbolResolvedCallback(symbolInfo);
        console.log('Tradingview Datafeed resolveSymbol:', { symbolInfo });
      }, 0);
    } catch (e) {
      console.error('Tradingview Datafeed resolveSymbol:', e);
      onResolveErrorCallback('Not feeling it today');
    }
  },

  getBars(
    symbolInfo: any,
    resolution: any,
    periodParams: any,
    onHistoryCallback: any = () => {},
    onErrorCallback: any = () => {},
  ) {
    const { from, to, firstDataRequest } = periodParams;
    // eslint-disable-next-line prefer-rest-params
    console.log('Tradingview Datafeed getBars:', { arguments });
    // console.log('function args',arguments)
    // console.log(`Requesting bars between ${new Date(from * 1000).toISOString()} and ${new Date(to * 1000).toISOString()}`)
    historyProvider
      .getBars(symbolInfo, resolution, from, to, firstDataRequest, null)
      .then((bars) => {
        if (bars.length) {
          onHistoryCallback(bars, { noData: false });
        } else {
          onHistoryCallback(bars, { noData: true });
        }
      })
      .catch((err) => {
        console.error('Tradingview Datafeed getBars:', { err });
        onErrorCallback(err);
      });
  },

  subscribeBars: (
    symbolInfo: any,
    resolution: any,
    onRealtimeCallback: any,
    subscribeUID: any,
    onResetCacheNeededCallback: any,
  ) => {
    console.log('Tradingview Datafeed subscribeBars:', {
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscribeUID,
      onResetCacheNeededCallback,
    });
  },

  unsubscribeBars: (subscriberUID: any) => {
    console.log('Tradingview Datafeed unsubscribeBars:', { subscriberUID });
  },

  calculateHistoryDepth: (resolution: any, resolutionBack: any, intervalBack: any) => {
    // optional
    console.log('Tradingview Datafeed calculateHistoryDepth:', {
      resolution,
      resolutionBack,
      intervalBack,
    });
    // while optional, this makes sure we request 24 hours of minute data at a time
    // CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
    return resolution < 60 ? { resolutionBack: 'D', intervalBack: '1' } : undefined;
  },

  getMarks: (
    symbolInfo: any,
    startDate: any,
    endDate: any,
    onDataCallback: any,
    resolution: any,
  ) => {
    // optional
    console.log('Tradingview Datafeed getMarks:', {
      symbolInfo,
      startDate,
      endDate,
      onDataCallback,
      resolution,
    });
  },

  getTimeScaleMarks: (
    symbolInfo: any,
    startDate: any,
    endDate: any,
    onDataCallback: any,
    resolution: any,
  ) => {
    // optional
    console.log('Tradingview Datafeed getTimeScaleMarks:', {
      symbolInfo,
      startDate,
      endDate,
      onDataCallback,
      resolution,
    });
  },

  getServerTime: (cb: any) => {
    console.log('Tradingview Datafeed getServerTime:', { cb });
  },
};
