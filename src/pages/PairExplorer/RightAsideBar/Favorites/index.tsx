import { useState } from 'react';
import OutsideAlerter from '../../../../utils/outsideClickWrapper';

import s from './Favorites.module.scss';

import cross from '../../../../assets/img/icons/close.svg';
import arrowRight from '../../../../assets/img/icons/arrow-right.svg';

const Favorite = () => {
  return (
    <div className={s.favorites_item}>
      <div className={s.favorites_item__left}>
        <div className={s.favorites_item__left__symbol}>LESS</div>
      </div>
      <div className={s.favorites_item__right}>
        <div className={s.favorites_item__right_price}>$5,540</div>
        <div className={s.favorites_item__right_arrow}>
          <img src={cross} alt="X" />
        </div>
      </div>
    </div>
  );
};

const Favorites: React.FC = () => {
  const [isModal, setIsModal] = useState(false);
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
        {isModal && (
          <div className={s.favorites_modal}>
            <div className={s.favorites_modal__inner}>
              <div className={s.favorites_modal__scroll}>
                <Favorite />
                <Favorite />
                <Favorite />
                <Favorite />
                <Favorite />
                <Favorite />
                <Favorite />
                <Favorite />
                <Favorite />
                <Favorite />
              </div>
            </div>
          </div>
        )}
      </div>
    </OutsideAlerter>
  );
};

export default Favorites;
