import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';

import PairsSearch from '../../components/PairsSearch/index';
// import AdBlock from '../../components/AdBlock/index';
import HotTable from './HotTable/index';
import Tool from './Tool/index';
import Partner from './Partner/index';
import { useMst } from '../../store/store';
import s from './BoardPage.module.scss';
// import AdImg from '../../assets/img/sections/ad/ad1.png';
// import BetYou from '../../assets/img/sections/board-page/bet-you.png';
// import bg from '../../assets/img/sections/board-page/background.svg';
// import uniLogo from '../../assets/img/sections/board-page/uni-logo.svg';
// import sushiLogo from '../../assets/img/sections/board-page/sushi-logo.svg';
import React from 'react';
import { NetworksIcons, NetworksForTools, DefaultPairsByNetwork } from '../../config/networks';

const BoardPage: React.FC = observer(() => {
  const { hotPairs } = useMst();

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
          {/* <AdBlock adImg={AdImg} /> */}
          <div className={s.containerForSearch}>
            <PairsSearch
              big
              placeholder="Search pairs by token symbol / token id / pair contract id"
            />
          </div>

          <div className={s.containerForTables}>
            <div className={s.tools}>
              {Object.entries(NetworksForTools).map((item: any) => {
                const [network, networkName] = item;
                const defaultPair = DefaultPairsByNetwork[network];
                return (
                  <Tool
                    key={uuid()}
                    title={`${networkName}`}
                    icon={NetworksIcons[network]}
                    links={[
                      `/${network.toLowerCase()}/live-new-pairs`,
                      `/${network.toLowerCase()}/pair-explorer/${defaultPair}`,
                      `/${network.toLowerCase()}/big-swap-explorer`,
                    ]}
                    keyName="uni"
                  />
                );
              })}
            </div>

            <div className={s.tables}>
              <HotTable title="HOT PAIRS" pairs={hotPairs} />
            </div>

            <div className={s.sponsors}>
              <div className={s.sponsors_header}>
                <div className={`${s.sponsors_header__bg}`}>
                  <div className={s.sponsors_header__icon}>
                    <div className={s.sponsors_header__icon_img}>
                      {/* <img src={logo} alt="logo" /> */}
                    </div>
                    <div className={s.sponsors_header__icon_text}>
                      <span>Featured Sponsors</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={s.sponsors_body}>
                <Partner />
                <Partner />
                {/* <Partner /> */}
              </div>
            </div>
          </div>

          {/* <div className={s.other}> */}
          {/*  <div className={s.other_block}> */}
          {/*    <img src={BetYou} alt="BetYou" /> */}
          {/*  </div> */}
          {/*  <div className={s.other_block}> */}
          {/*    <img src={BetYou} alt="BetYou" /> */}
          {/*  </div> */}
          {/*  <div className={s.other_block}> */}
          {/*    <img src={BetYou} alt="BetYou" /> */}
          {/*  </div> */}
          {/* </div> */}
        </div>
      </div>

      {/* <div className={s.board_bg}>
        <img src={bg} alt="bg" />
      </div> */}
    </main>
  );
});

export default BoardPage;
