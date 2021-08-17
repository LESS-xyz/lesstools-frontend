import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { useMst } from '../../store/store';
import { GET_HOT_PAIRS, GET_HOT_PAIRS_SUSHISWAP } from '../../queries/index';
import { uniswapCurrentVersion, sushiswapSubgraph } from '../../index';
import { WHITELIST } from '../../data/whitelist';

// get timestamp code of the start of current hour
const getStartOfHour = () => {
  return Math.floor(Math.floor(Date.now() / 1000) / 3600) * 3600;
};

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

type response = {
  currentHour: Array<IPairFromGraph>;
  oneHour: Array<IPairFromGraph>;
  twoHours: Array<IPairFromGraph>;
};

const HotPairs: React.FC = () => {
  const { hotPairs } = useMst();

  const { data } = useQuery<response>(GET_HOT_PAIRS, {
    client: uniswapCurrentVersion,
    variables: {
      timestamp1: getStartOfHour(),
      timestamp2: getStartOfHour() - 3600,
      timestamp3: getStartOfHour() - 7200,
    },
  });

  const { data: sushiPairs } = useQuery<response>(GET_HOT_PAIRS_SUSHISWAP, {
    client: sushiswapSubgraph,
    // HARDCODE
    variables: {
      timestamp1: 1623924000,
      timestamp2: 1623924000 - 3600,
      timestamp3: 1623924000 - 7200,
    },
  });

  function formatData(pairs: response) {
    const pairsSumma: { [key: string]: IPairFromGraph } = {};

    const addPairToSumm = (info: IPairFromGraph) => {
      const tbr = WHITELIST.includes(info.pair.token0.id) ? info.pair.token1 : info.pair.token0;
      if (tbr.symbol in pairsSumma) {
        const newInfo = { ...info };
        newInfo.hourlyTxns = (+info.hourlyTxns + +pairsSumma[tbr.symbol].hourlyTxns).toString();
        pairsSumma[tbr.symbol] = newInfo;
      } else pairsSumma[tbr.symbol] = info;
    };

    pairs.currentHour.forEach((info: IPairFromGraph) => addPairToSumm(info));
    pairs.oneHour.forEach((info: IPairFromGraph) => addPairToSumm(info));
    pairs.twoHours.forEach((info: IPairFromGraph) => addPairToSumm(info));

    const finalData = Object.values(pairsSumma)
      .sort((a: IPairFromGraph, b: IPairFromGraph) => +b.hourlyTxns - +a.hourlyTxns)
      .filter(
        (el) => !(WHITELIST.includes(el.pair.token0.id) && WHITELIST.includes(el.pair.token1.id)),
      )
      .slice(0, 10);

    return finalData;
  }

  useEffect(() => {
    if (data) {
      hotPairs.setUniPairs(formatData(data));
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (sushiPairs) {
      hotPairs.setSushiPairs(formatData(sushiPairs));
    }
    // eslint-disable-next-line
  }, [sushiPairs]);

  return <></>;
};

export default HotPairs;
