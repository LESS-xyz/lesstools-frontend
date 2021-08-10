import { useState } from 'react';

import PairsSearch from '../../components/PairsSearch/index';
import AdBlock from '../../components/AdBlock/index';
import HotTable from './HotTable/index';
import Tool from './Tool/index';
import Partner from './Partner/index';

import s from './BoardPage.module.scss';

import AdImg from '../../assets/img/sections/ad/ad1.png';
import BetYou from '../../assets/img/sections/board-page/bet-you.png';

const BoardPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <main className={s.board}>
      <div className={s.bg}>
        <div className={s.container}>
          <AdBlock adImg={AdImg} />
          <PairsSearch
            placeholder="Search pair by token symbol / token id / pair contract id."
            value={searchValue}
            setValue={setSearchValue}
          />
          <div className={s.tables}>
            <HotTable />
            <HotTable />
          </div>
          <div className={s.tools}>
            <Tool />
            <Tool />
            <Tool />
          </div>
          <div className={s.sponsors}>
            <div className={s.sponsors_title}>
              <span>Featured Sponsors</span>
            </div>
            <div className={s.sponsors_body}>
              <Partner />
              <Partner />
              <Partner />
            </div>
          </div>
          <div className={s.other}>
            <div className={s.other_block}>
              <img src={BetYou} alt="BetYou" />
            </div>
            <div className={s.other_block}>
              <img src={BetYou} alt="BetYou" />
            </div>
            <div className={s.other_block}>
              <img src={BetYou} alt="BetYou" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BoardPage;
