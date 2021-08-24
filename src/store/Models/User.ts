import { types } from 'mobx-state-tree';

const UserModel = types
  .model({
    walletId: types.union(types.string, types.null),
    isVerified: types.boolean,
  })
  .actions((self) => ({
    setUserWalletId(walletId: string | null) {
      self.walletId = walletId;
    },
    setIsUserVerified(foo: boolean) {
      self.isVerified = foo;
    },
    disconect() {
      self.walletId = null;
      self.isVerified = false;
    },
  }));

export default UserModel;
