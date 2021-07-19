import { createContext, useContext } from 'react';
import { Instance, onSnapshot, types } from 'mobx-state-tree';

import { PairExplorerModel } from './Models';

const RootModel = types.model({
  pairExplorer: PairExplorerModel,
});

export const Store = RootModel.create({
  pairExplorer: {
    base_info: {
      createdAtTimestamp: '',
      liquidityProviderCount: '3140920',
      reserve0: '',
      reserve1: '',
      reserveUSD: '',
      token0: {
        derivedETH: '',
        symbol: '',
        totalSupply: '',
      },
      token1: {
        derivedETH: '',
        symbol: '',
        totalSupply: '',
      },
      txCount: '',
      volumeUSD: '',
    },
    h24_ago_by_sum: [],
  },
});

const rootStore = Store;

onSnapshot(rootStore, (snapshot) => {
  console.log('Snapshot: ', snapshot);
});

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const { Provider } = RootStoreContext;

export function useMst(): RootInstance {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be bull');
  }
  return store;
}

export default rootStore;
