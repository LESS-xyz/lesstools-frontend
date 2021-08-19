import Favorites from './Favorites/index';

import s from './RightAsideBar.module.scss';

const RightAsideBar: React.FC = () => {
  return (
    <>
      <Favorites />
      <div className={s.table_header}>
        <div className={s.table_header__title}>Token mount</div>
        <div className={s.table_header__title}>Time ago</div>
      </div>
      <div className={s.trades}>trades</div>
      <div className={s.options}>options</div>
      <div className={s.table_header}>
        <div className={s.table_header__title}>Data</div>
        <div className={s.table_header__title}>P/L</div>
      </div>
      <div className={s.trades}>my trades</div>
    </>
  );
};

export default RightAsideBar;
