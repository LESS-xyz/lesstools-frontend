import backend from '../../services/backend';

export const resolutionsForOurBackend = {
  '1': 'minute',
  '60': 'hour',
  '1D': 'day',
};

export const resolutionToCandlesAmount = {
  '1': 10000,
  '60': 1000,
  '1D': 90,
};

type TimeIntervals = '1' | '60' | '1D';

interface IGetCandlesFromOurBackendProps {
  pair_id: string;
  pool: string;
  time_interval: TimeIntervals;
  candles?: number;
}

interface ICandleFromBackend {
  close: string;
  end_time: number;
  high: string;
  low: string;
  open: string;
  start_time: number;
  volume: number;
}

interface IFormattedCandle {
  time: number;
  low: string;
  high: string;
  open: string;
  close: string;
  volume: number;
}

export const getCandlesFromOurBackend = async (data: IGetCandlesFromOurBackendProps) => {
  const candlesFromBackend = await backend.getCandlesFromOurBackned({
    pair_id: data.pair_id,
    pool: data.pool,
    time_interval: resolutionsForOurBackend[data.time_interval],
    candles: data.candles || resolutionToCandlesAmount[data.time_interval],
  });

  const candles: Array<ICandleFromBackend> = Object.values(candlesFromBackend.data);
  const formattedCandles: Array<IFormattedCandle> = [];

  for (let i = 0; i < candles.length; i += 1) {
    const currentCandle = candles[i];

    formattedCandles.push({
      time: currentCandle.start_time * 1000, // TradingView requires bar time in ms
      low: currentCandle.low,
      high: currentCandle.high,
      open: currentCandle.open,
      close: currentCandle.close,
      volume: currentCandle.volume,
    });
  }

  for (let i = 0; i < Math.floor(formattedCandles.length / 2); i += 1) {
    const firstTime = formattedCandles[i].time;
    formattedCandles[i].time = formattedCandles[formattedCandles.length - i - 1].time;
    formattedCandles[formattedCandles.length - i - 1].time = firstTime;
  }

  return formattedCandles.filter((candle) => candle.open);
};

export const getCandlesFromOurBackendNoReverse = async (data: IGetCandlesFromOurBackendProps) => {
  const candlesFromBackend = await backend.getCandlesFromOurBackned({
    pair_id: data.pair_id,
    pool: data.pool,
    time_interval: resolutionsForOurBackend[data.time_interval],
    candles: data.candles || resolutionToCandlesAmount[data.time_interval],
  });

  const candles: Array<ICandleFromBackend> = Object.values(candlesFromBackend.data);
  const formattedCandles: Array<IFormattedCandle> = [];

  for (let i = 0; i < candles.length; i += 1) {
    const currentCandle = candles[i];

    if (currentCandle.open) {
      formattedCandles.push({
        time: currentCandle.start_time * 1000, // TradingView requires bar time in ms
        low: currentCandle.low,
        high: currentCandle.high,
        open: currentCandle.open,
        close: currentCandle.close,
        volume: currentCandle.volume,
      });
    }
  }

  return formattedCandles;
};
