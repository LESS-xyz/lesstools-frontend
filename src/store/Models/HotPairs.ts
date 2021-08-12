import { types } from 'mobx-state-tree';

const TokenModel = types.model({
  id: types.string,
  symbol: types.string,
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
    pairs: types.array(InfoModel),
  })
  .actions((self) => ({
    //   TODO: fix any
    setPairs(pairs: any) {
      self.pairs = pairs;
    },
  }));

export default HotPairsModel;
