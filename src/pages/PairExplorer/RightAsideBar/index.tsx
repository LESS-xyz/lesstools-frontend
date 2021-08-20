import Favorites from './Favorites/index';
import Transaction from './Transaction/index';
import { IRowPairExplorer } from '../../../types/table';

import s from './RightAsideBar.module.scss';

import tradesWhite from '../../../assets/img/icons/trades-white.svg';

interface isRightSideBarProps {
  trades: IRowPairExplorer[];
}

const RightAsideBar: React.FC<isRightSideBarProps> = ({ trades }) => {
  return (
    <>
      <Favorites />
      <div className={s.table_header}>
        <div className={s.table_header__title}>Token amount</div>
        <div className={s.table_header__title}>Time ago</div>
      </div>
      <div className={`${s.transactions} grey-scroll`}>
        {trades.map((trade) => (
          <Transaction
            ethPrice={trade.totalEth}
            priceUsd={trade.priceUsd}
            amountEth={trade.amountEth}
            type={trade.type}
            etherscan={trade.others.etherscan}
            timestamp={trade.data}
            tbrSymbol={trade.tbr.symbol}
            otherSymbol={trade.otherToken.symbol}
          />
        ))}
      </div>
      <div className={s.options}>
        <div className={`${s.option} ${s.active}`}>
          <div className={s.option_inner}>
            <div className={s.option_icon}>
              <img src={tradesWhite} alt="trades" />
            </div>
            <div className={s.option_text}>My Trades</div>
          </div>
        </div>
        <div className={`${s.option} ${s.disabled}`}>
          <div className={s.option_inner}>
            <div className={s.option_text}>Price Alert</div>
            <div className={s.option_soon}>
              <div className={s.option_soon__inner}>
                <span>Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.table_header}>
        <div className={s.table_header__title}>Token amount</div>
        <div className={s.table_header__title}>Time ago</div>
      </div>
      <div className={`${s.trades} grey-scroll`}>
        {trades
          .filter((trade) => trade.maker.includes('0x'))
          .map((trade) => (
            <Transaction
              key={`${trade.maker}-${trade.data}`}
              ethPrice={trade.totalEth}
              priceUsd={trade.priceUsd}
              amountEth={trade.amountEth}
              type={trade.type}
              etherscan={trade.others.etherscan}
              timestamp={trade.data}
              tbrSymbol={trade.tbr.symbol}
              otherSymbol={trade.otherToken.symbol}
            />
          ))}
        {trades.filter((trade) => trade.maker.includes('0x')).length < 1 && <div>No data</div>}
      </div>
    </>
  );
};

export default RightAsideBar;
