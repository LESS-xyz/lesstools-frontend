import s from './HotTable.module.scss';

import uniLogo from '../../../assets/img/sections/board-page/uni-logo.svg';
import compass from '../../../assets/img/sections/board-page/compass.svg';

const HotTable: React.FC = () => {
  return (
    <section className={s.table}>
      <div className={s.table_header}>
        <div className={`${s.table_header__bg} ${s.sushi}`}>
          <div className={s.table_header__icon}>
            <div className={s.table_header__icon_img}>
              <img src={uniLogo} alt="uniLogo" />
            </div>
            <div className={s.table_header__icon_text}>
              <span>HOT UNI</span>
            </div>
          </div>
        </div>
      </div>
      <div className={s.table_body}>
        <div className={s.table_body__item}>
          <div className={s.table_body__item_left}>
            <div className={s.table_body__item_left__token}>LIME</div>
            <p>$0.045645</p>
          </div>
          <div className={s.table_body__item_right}>
            <img src={compass} alt="compass" />
          </div>
        </div>
        <div className={s.table_body__item}>
          <div className={s.table_body__item_left}>
            <div className={s.table_body__item_left__token}>LIME</div>
            <p>$0.045645</p>
          </div>
          <div className={s.table_body__item_right}>
            <img src={compass} alt="compass" />
          </div>
        </div>
        <div className={s.table_body__item}>
          <div className={s.table_body__item_left}>
            <div className={s.table_body__item_left__token}>LIME</div>
            <p>$0.045645</p>
          </div>
          <div className={s.table_body__item_right}>
            <img src={compass} alt="compass" />
          </div>
        </div>
        <div className={s.table_body__item}>
          <div className={s.table_body__item_left}>
            <div className={s.table_body__item_left__token}>LIME</div>
            <p>$0.045645</p>
          </div>
          <div className={s.table_body__item_right}>
            <img src={compass} alt="compass" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotTable;
