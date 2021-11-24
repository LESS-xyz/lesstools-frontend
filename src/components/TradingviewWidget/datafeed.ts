import historyProvider from './historyProvider';

const config = {
  supported_resolutions: ['1', '3', '5', '15', '30', 'H', '2H', '4H', '12H', 'D', '3D', '7D'],
  // favorites: {
  //   intervals: ['1', '3', '5', '15', '30', 'H', '2H', '4H', '12H', 'D', '3D', '7D'],
  //   chartTypes: ['Candles'],
  // },
};

export default {
  onReady: (callback: any) => {
    console.log('Tradingview Datafeed onReady:');
    setTimeout(() => callback(config), 0);
  },

  resolveSymbol: (symbolName: any, onSymbolResolvedCallback: any, onResolveErrorCallback: any) => {
    try {
      // expects a symbolInfo object in response
      const split_data = symbolName.split(/[:/]/);
      const symbolInfo = {
        name: symbolName,
        full_name: symbolName,
        pro_name: symbolName,
        description: '',
        type: 'crypto',
        session: '24x7',
        timezone: '(UTC+3)',
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

      setTimeout(function () {
        onSymbolResolvedCallback(symbolInfo);
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
