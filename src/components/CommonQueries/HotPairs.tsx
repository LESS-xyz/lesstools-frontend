import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';

import { useMst } from '../../store/store';
import { GET_HOT_PAIRS } from '../../queries/index';
import { uniswapCurrentVersion } from '../../index';
import { WHITELIST } from '../../data/whitelist';

// get timestamp code of the start of current hour
const getStartOfHour = () => {
  return Math.floor(Math.floor(Date.now() / 1000) / 3600) * 3600;
};

const HotPairs = () => {
  const { hotPairs } = useMst();

  const [getHotPairs, { data }] = useLazyQuery(GET_HOT_PAIRS, {
    client: uniswapCurrentVersion,
  });
  useEffect(() => {
    getHotPairs({
      variables: {
        timestamp1: getStartOfHour(),
        timestamp2: getStartOfHour() - 3600,
        timestamp3: getStartOfHour() - 7200,
      },
    });
    // eslint-disable-next-line
  }, []);

  // TODO: add types
  useEffect(() => {
    if (data) {
      const pairsSumma: any = {};
      const addPairToSumm = (info: any) => {
        const tbr = WHITELIST.includes(info.pair.token0.id) ? info.pair.token1 : info.pair.token0;
        if (tbr.symbol in pairsSumma) {
          const newInfo = { ...info };
          newInfo.hourlyTxns = +info.hourlyTxns + +pairsSumma[tbr.symbol].hourlyTxns;
          pairsSumma[tbr.symbol] = newInfo;
        } else pairsSumma[tbr.symbol] = info;
      };
      data.currentHour.forEach((info: any) => addPairToSumm(info));
      data.oneHour.forEach((info: any) => addPairToSumm(info));
      data.twoHours.forEach((info: any) => addPairToSumm(info));

      // финальный массив на 10 топ пар
      hotPairs.setPairs(
        Object.values(pairsSumma)
          .sort((a: any, b: any) => b.hourlyTxns - a.hourlyTxns)
          .slice(0, 10),
      );
    }
    // eslint-disable-next-line
  }, [data]);

  return <></>;
};

export default HotPairs;
