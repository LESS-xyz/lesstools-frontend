import { types } from 'mobx-state-tree';

const UserModel = types
  .model({
    walletId: types.union(types.string, types.null),
  })
  .actions((self) => ({
    setUserWalletId(walletId: string) {
      self.walletId = walletId;
    },
  }));

export default UserModel;
