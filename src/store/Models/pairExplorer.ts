import { types } from 'mobx-state-tree';

const Token = types.model({
  derivedETH: types.string,
  symbol: types.string,
  totalSupply: types.string,
});

const BaseInfo = types.model({
  createdAtTimestamp: types.string,
  liquidityProviderCount: types.string,
  reserve0: types.string,
  reserve1: types.string,
  reserveUSD: types.string,
  token0: Token,
  token1: Token,
  txCount: types.string,
  volumeUSD: types.string,
});

const HourlyVolumeUSD = types.model({
  hourlyVolumeUSD: types.string,
});

const PairExplorerModel = types
  .model({
    base_info: BaseInfo,
    h24_ago_by_sum: types.array(HourlyVolumeUSD),
  })
  .actions((self) => {
    const setliquidityProviderCount = (value: string) => {
      self.base_info.liquidityProviderCount = value;
    };

    return {
      setliquidityProviderCount,
    };
  });

export default PairExplorerModel;
