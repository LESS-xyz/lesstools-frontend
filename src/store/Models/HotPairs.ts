import { types } from 'mobx-state-tree';

const TokenModel = types.model({
  id: types.string,
  symbol: types.string,
  derivedUSD: types.string,
});

const PairModel = types.model({
  id: types.string,
  token0: TokenModel,
  token1: TokenModel,
});

const InfoModel = types.model({
  hourlyTxns: types.union(types.string, types.number),
  pair: PairModel,
});

const HotPairsModel = types
  .model({
    uniswap: types.array(InfoModel),
    sushiswap: types.array(InfoModel),
  })
  .actions((self) => ({
    // TODO: fix any
    setUniPairs(pairs: any) {
      self.uniswap = pairs;
    },
    setSushiPairs(pairs: any) {
      self.sushiswap = pairs;
    },
  }));

export default HotPairsModel;
