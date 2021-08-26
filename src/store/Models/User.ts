import { types } from 'mobx-state-tree';

const TokenModel = types.model({
  derivedUSD: types.string,
  symbol: types.string,
});

const FavoritePairModel = types.model({
  id: types.string,
  token0: TokenModel,
  token1: TokenModel,
});

const UserModel = types
  .model({
    walletId: types.union(types.string, types.null),
    isVerified: types.boolean,
    favoritePairs: types.array(FavoritePairModel),
  })
  .actions((self) => ({
    setUserWalletId(walletId: string | null) {
      self.walletId = walletId;
    },
    setIsUserVerified(foo: boolean) {
      self.isVerified = foo;
    },
    setFavoritesPairs(pairs: any) {
      self.favoritePairs = pairs;
    },
    disconect() {
      self.walletId = null;
      self.isVerified = false;
    },
  }));

export default UserModel;
