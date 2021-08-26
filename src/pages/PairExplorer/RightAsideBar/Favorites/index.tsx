import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import BigNumber from 'bignumber.js/bignumber';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import OutsideAlerter from '../../../../utils/outsideClickWrapper';
import backend, { PLATFORM } from '../../../../services/backend/index';
import { GET_FAVORITES_PAIRS } from '../../../../queries/index';
import { sushiswapSubgraph, uniswapSubgraph } from '../../../../index';
import { useMst } from '../../../../store/store';

import s from './Favorites.module.scss';

import cross from '../../../../assets/img/icons/close.svg';
import arrowRight from '../../../../assets/img/icons/arrow-right.svg';

interface IFavorite {
  symbol: string;
  price: string;
  pairId: string;
  deletePair: () => void;
  currentExchange: 'uniswap' | 'sushiswap';
}

const Favorite: React.FC<IFavorite> = ({ symbol, price, deletePair, pairId, currentExchange }) => {
  return (
    <div className={s.favorites_item}>
      <div className={s.favorites_item__left}>
        <Link
          to={`/app/${currentExchange}/pair-explorer/${pairId}`}
          className={s.favorites_item__left__symbol}
        >
          {symbol}
        </Link>
      </div>
      <div className={s.favorites_item__right}>
        <div className={s.favorites_item__right_price}>${new BigNumber(price).toFormat(2)}</div>
        <button
          type="button"
          onClick={() => deletePair()}
          className={s.favorites_item__right_arrow}
        >
          <img src={cross} alt="X" />
        </button>
      </div>
    </div>
  );
};

const Favorites: React.FC = observer(() => {
  const [isModal, setIsModal] = useState(false);
  const { user, currentExchange } = useMst();

  const [getPairsFromGraph, { loading, data: favs }] = useLazyQuery(GET_FAVORITES_PAIRS, {
    client: currentExchange.exchange === 'uniswap' ? uniswapSubgraph : sushiswapSubgraph,
  });

  useEffect(() => {
    if (!loading && favs) {
      user.setFavoritesPairs(favs.pairs);
    }
    // eslint-disable-next-line
  }, [loading, favs]);

  // получение избранных пар с графа
  const getFavoritePairs = async () => {
    const ids = await backend.getFavoritesOfUser({ platform: 'ETH' });
    getPairsFromGraph({ variables: { ids: ids?.data?.map((id: string) => id.toLowerCase()) } });
  };

  useEffect(() => {
    getFavoritePairs();
    // eslint-disable-next-line
  }, []);

  const deletePair = async (pair_address: string, platform: PLATFORM) => {
    backend.addOrRemovePairToFavorite({ pair_address, platform });

    const newPairs = user.favoritePairs.filter(
      (pair) => pair.id.toLowerCase() !== pair_address.toLowerCase(),
    );
    user.setFavoritesPairs(newPairs);
  };

  return (
    <OutsideAlerter fn={() => setIsModal(false)}>
      <div className={s.favorites}>
        <div
          className={s.favorites_main}
          tabIndex={0}
          onKeyDown={() => {}}
          role="button"
          onClick={() => setIsModal(!isModal)}
        >
          <div className={s.favorites_main__left}>
            <div className={s.favorites_main__left__title}>Favorites</div>
            <div className={s.favorites_main__left__symbol}>LESS</div>
          </div>
          <div className={s.favorites_main__right}>
            <div className={s.favorites_main__right_price}>$5,540</div>
            <div className={s.favorites_main__right_arrow}>
              <img src={arrowRight} alt=">" />
            </div>
          </div>
        </div>
        {isModal && !loading && user.favoritePairs && (
          <div className={s.favorites_modal}>
            <div className={s.favorites_modal__inner}>
              <div className={`${s.favorites_modal__scroll} grey-scroll`}>
                {user.favoritePairs.map((pair: any) => (
                  <Favorite
                    symbol={pair.token0.symbol}
                    price={pair.token0.derivedUSD}
                    pairId={pair.id}
                    deletePair={() => deletePair(pair.id, 'ETH')}
                    currentExchange={currentExchange.exchange}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </OutsideAlerter>
  );
});

export default Favorites;
