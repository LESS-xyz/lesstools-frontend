import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react-lite';

import PairsSearch from '../../components/PairsSearch/index';
import AdBlock from '../../components/AdBlock/index';
import HotTable from './HotTable/index';
import Tool from './Tool/index';
import Partner from './Partner/index';
import { useMst } from '../../store/store';

import s from './BoardPage.module.scss';

import AdImg from '../../assets/img/sections/ad/ad1.png';
import BetYou from '../../assets/img/sections/board-page/bet-you.png';
import bg from '../../assets/img/sections/board-page/background.svg';
import uniLogo from '../../assets/img/sections/board-page/uni-logo.svg';
import sushiLogo from '../../assets/img/sections/board-page/sushi-logo.svg';

const BoardPage: React.FC = observer(() => {
  const [searchValue, setSearchValue] = useState('');
  const { hotPairs, currentExchange } = useMst();

  return (
    <main className={s.board}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Board - LessTools</title>
        <meta
          name="description"
          content="Multi-Chain Decentralized
Fundraising Capital"
        />
      </Helmet>
      <div className={s.bg}>
        <div className={s.container}>
          <AdBlock adImg={AdImg} />
          <PairsSearch
            placeholder={`Search ${currentExchange.exchange} pairs by token symbol / token id / pair contract id.`}
            value={searchValue}
            setValue={setSearchValue}
          />
          <div className={s.tables}>
            <HotTable title="HOT UNI" logo={uniLogo} pairs={hotPairs.uniswap} />
            <HotTable title="HOT SUSHI" logo={sushiLogo} pairs={hotPairs.sushiswap} />
          </div>
          <div className={s.tools}>
            <Tool
              title="Uniswap V2"
              icon={uniLogo}
              links={[
                '/app/uniswap/live-new-pairs',
                '/app/uniswap/pair-explorer/0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
                '/app/uniswap/big-swap-explorer',
              ]}
              keyName="uni"
            />
            <Tool
              title="Sushiswap"
              icon={sushiLogo}
              links={[
                '/app/sushiswap/live-new-pairs',
                '/app/sushiswap/pair-explorer/0xc3f279090a47e80990fe3a9c30d24cb117ef91a8',
                '/app/sushiswap/big-swap-explorer',
              ]}
              keyName="sushi"
            />
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
      <div className={s.board_bg}>
        <img src={bg} alt="bg" />
      </div>
    </main>
  );
});

export default BoardPage;
