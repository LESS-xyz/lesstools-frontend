import { types } from 'mobx-state-tree';
import { Exchange } from "../../config/exchanges";

const CurrentExchangeModel = types
  .model({
    exchange: types.union(types.literal('uniswap'), types.literal('sushiswap'), types.literal('quickswap')),
  })
  .actions((self) => ({
    setCurrentExchange(exchange: Exchange) {
      self.exchange = exchange;
    },
  }));

export default CurrentExchangeModel;
