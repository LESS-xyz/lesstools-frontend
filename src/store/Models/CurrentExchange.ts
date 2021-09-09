import { types } from 'mobx-state-tree';

type Exchange = 'uniswap' | 'sushiswap';

const CurrentExchangeModel = types
  .model({
    exchange: types.union(types.literal('uniswap'), types.literal('sushiswap')),
  })
  .actions((self) => ({
    setCurrentExchange(exchange: Exchange) {
      self.exchange = exchange;
    },
  }));

export default CurrentExchangeModel;
