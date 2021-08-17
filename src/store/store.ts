import { createContext, useContext } from 'react';
import { Instance, onSnapshot, types } from 'mobx-state-tree';

import { ModalsModel, HotPairsModel, CurrentExchangeModel } from './Models/index';

const RootModel = types.model({
  modals: ModalsModel,
  hotPairs: HotPairsModel,
  currentExchange: CurrentExchangeModel,
});

export const Store = RootModel.create({
  modals: {
    openedModals: [],
  },
  hotPairs: {
    uniswap: [],
    sushiswap: [],
  },
  currentExchange: {
    exchange: 'uniswap',
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
