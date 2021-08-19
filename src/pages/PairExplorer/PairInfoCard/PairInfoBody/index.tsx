import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import BigNumber from 'bignumber.js/bignumber';
import ReactTooltip from 'react-tooltip';

import { ITokenData } from '../PairInfoHeader';
import CommunityTrust from '../CommunityTrust/index';
import Loader from '../../../../components/Loader/index';
import { WHITELIST } from '../../../../data/whitelist';
import { IToken } from '../../../../api/getTokensInfoFromCoingecko';
// import { copyText } from '../../../../utils/copyText';
import { useMst } from '../../../../store/store';
import MoreInfoModal from '../../../../components/Modals/MoreInfoModal/index';
import ShareModal from '../../../../components/Modals/ShareModal/index';
import TradeModal from '../../../../components/Modals/TradeModal/index';

import s from './PairInfoBody.module.scss';

import favImg from '../../../../assets/img/icons/favorite.svg';
import shareImg from '../../../../assets/img/icons/share.svg';
import scoreBg from '../../../../assets/img/icons/less-score-bg.svg';

// import marketcap from '../../../../assets/img/icons/marketcap.svg';
// import etherscan from '../../../../assets/img/icons/table/actions-etherscan.svg';
// import twitter from '../../../../assets/img/icons/twitter-blue.svg';
// import telegram from '../../../../assets/img/icons/telegram-blue.svg';
// import desktop from '../../../../assets/img/icons/desktop-blue.svg';

const LessScore = () => (
  <div className={s.score}>
    <div className={s.score_info}>
      <div className={s.score_title}>LessScore</div>
      <div className={s.score_number}>
        <span>95%</span>
      </div>
    </div>
    <div className={s.score_img}>
      <img src={scoreBg} alt="scoreBg" />
    </div>
  </div>
);

export interface IPairInfo {
  base_info: {
    liquidityProviderCount: string;
    reserve0: string;
    reserve1: string;
    reserveUSD: string;
    token0: ITokenData;
    token1: ITokenData;
    txCount: string;
    volumeUSD: string;
    createdAtTimestamp: string;
  };
  h24_ago_by_sum: Array<{ hourlyVolumeUSD: string }>;
  tokens_prices_24h_ago: {
    token0: { derivedETH: string; derivedUSD: string };
    token1: { derivedETH: string; derivedUSD: string };
  };
}

interface IPairInfoBodyProps {
  pairId: string;
  loading: boolean;
  pairInfo: IPairInfo;
  tokenInfoFromCoingecko: IToken | undefined;
}

const PairInfoBody: React.FC<IPairInfoBodyProps> = observer(({ pairInfo, pairId }) => {
  // tbr = token being reviewed
  const [tbr, setTbr] = useState(pairInfo?.base_info?.token1);
  const [tbrIndex, setTbrIndex] = useState<'0' | '1'>('1');
  const [otherToken, setOtherToken] = useState(pairInfo?.base_info?.token0);

  useEffect(() => {
    if (WHITELIST.includes(pairInfo?.base_info?.token1?.id)) {
      setTbr(pairInfo.base_info.token0);
      setTbrIndex('0');
      setOtherToken(pairInfo.base_info.token1);
    }
  }, [pairInfo]);

  const { modals } = useMst();
  const handleOpenMoreInfoModal = () => {
    modals.open('MoreInfo');
  };
  const handleOpenShareModal = () => {
    modals.open('Share');
  };
  const handleOpenTradeModal = () => {
    modals.open('Trade');
  };

  // изменение цены токена за 24 часа в процентах
  const tokenPrice24hAgo =
    tbrIndex === '1'
      ? +pairInfo.tokens_prices_24h_ago?.token1.derivedETH
      : +pairInfo.tokens_prices_24h_ago?.token0.derivedETH;
  const tokenPrice24HoursChange = new BigNumber(
    (+tbr?.derivedETH / tokenPrice24hAgo) * 100 - 100,
  ).toFormat(2);

  if (!pairInfo.base_info) return <div>No data</div>;

  return (
    <section className={s.card}>
      <MoreInfoModal
        TBRprice={tbr.derivedUSD}
        TBRsymbol={tbr.symbol}
        otherTokenPrice={otherToken.derivedUSD}
        otherTokenSymbol={otherToken.symbol}
        poolCreated={pairInfo.base_info.createdAtTimestamp}
      />
      <ShareModal
        url={window.location.href}
        text={`Check ${tbr.symbol} at LESSTools! Price: $${(+tbr.derivedUSD).toFixed(
          2,
        )} - Shared from LESSTools.io`}
      />
      <TradeModal tokenId={tbr.id} />
      {!pairInfo.base_info ? (
        <div className={s.card_no_data}>
          <Loader />
        </div>
      ) : (
        <div className={s.card_inner}>
          <div className={s.header}>
            <div className={s.card_buttons}>
              <div
                onClick={handleOpenShareModal}
                tabIndex={0}
                onKeyDown={handleOpenShareModal}
                role="button"
                className={s.card_button}
              >
                <img src={shareImg} alt="img" />
              </div>
              <div className={s.card_button}>
                <img src={favImg} alt="img" />
              </div>
            </div>
            <div
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
              onClick={() => handleOpenTradeModal()}
              className={s.card_trade}
            >
              Trade
            </div>
          </div>
          <div className={s.price}>
            <div className={s.card_body__price}>${new BigNumber(tbr.derivedUSD).toFormat(5)}</div>
            <div className={`${s.card_body__info} ${tokenPrice24HoursChange < 0 ? s.red : ''}`}>
              <span>
                (24h:{' '}
                {tokenPrice24HoursChange === 'NaN' ? 'No data' : `${tokenPrice24HoursChange}%`})
              </span>{' '}
              {new BigNumber(tbr.derivedETH).toFormat(7)} ETH
            </div>
          </div>
          <button
            tabIndex={0}
            type="button"
            onKeyDown={handleOpenMoreInfoModal}
            onClick={handleOpenMoreInfoModal}
            className={s.market_cap_button}
          >
            View market cap
          </button>
          <div className={s.token_info}>
            <div className={s.token_info__item}>
              <div className={s.token_info__item__title}>Token contract:</div>
              <div className={s.token_info__item__value}>
                {pairId.slice(0, 5)}...{pairId.slice(-4)}
              </div>
            </div>
            <div className={s.token_info__item}>
              <div className={s.token_info__item__title}>Total liquidity:</div>
              <div className={s.token_info__item__value}>
                ${new BigNumber(pairInfo.base_info.reserveUSD).toFormat(2)}
              </div>
            </div>
            <div className={s.token_info__item}>
              <div className={s.token_info__item__title}>Daily volume:</div>
              <div className={s.token_info__item__value}>
                $
                {new BigNumber(
                  pairInfo.h24_ago_by_sum.reduce((acc, cur) => {
                    return acc + Number(cur.hourlyVolumeUSD);
                  }, 0),
                ).toFormat(2)}
              </div>
            </div>
            <div className={s.token_info__item}>
              <div className={s.token_info__item__title}>
                Pooled {pairInfo.base_info.token0.symbol}:
              </div>
              <div className={s.token_info__item__value}>
                {new BigNumber(pairInfo.base_info.reserve0).toFormat(2)}
              </div>
            </div>
            <div className={s.token_info__item}>
              <div className={s.token_info__item__title}>
                Pooled {pairInfo.base_info.token1.symbol}:
              </div>
              <div className={s.token_info__item__value}>
                {new BigNumber(pairInfo.base_info.reserve1).toFormat(2)}
              </div>
            </div>
            <div className={s.token_info__item}>
              <div className={s.token_info__item__title}>Total tx:</div>
              <div className={s.token_info__item__value}>
                {new BigNumber(pairInfo.base_info.txCount).toFormat(2)}
              </div>
            </div>
            <div className={s.token_info__item}>
              <div className={s.token_info__item__title}>Holders:</div>
              <div className={s.token_info__item__value}>soon</div>
            </div>
          </div>
          <div className={s.card_section}>
            <ReactTooltip />
            <LessScore />
          </div>
          <div className={s.card_section}>
            <CommunityTrust votesAmount={905} likes={505} dislikes={400} />
          </div>
          {/* <div className={s.links}>
              <a
                href={`https://etherscan.io/token/${tbr.id}`}
                target="_blank"
                rel="noreferrer noopener"
                className={s.card_link}
              >
                <div className={s.card_link__img}>
                  <img src={etherscan} alt="etherscan" />
                </div>
                <div className={s.card_link__title}>Etherscan</div>
              </a>
              <a
                href={`https://coinmarketcap.com/currencies/${tokenInfoFromCoingecko?.name?.replace(
                  /\s/g,
                  '-',
                )}/`}
                target="_blank"
                rel="noreferrer noopener"
                className={s.card_link}
              >
                <div className={s.card_link__img}>
                  <img src={marketcap} alt="marketcap" />
                </div>
                <div className={s.card_link__title}>CoinMarketcap</div>
              </a>
              <div className={s.card_link}>
                <div className={s.card_link__img}>
                  <img src={twitter} alt="twitter" />
                </div>
                <div className={s.card_link__title}>Twitter</div>
              </div>
              <div className={s.card_link}>
                <div className={s.card_link__img}>
                  <img src={telegram} alt="telegram" />
                </div>
                <div className={s.card_link__title}>Telegram</div>
              </div>
              <div className={s.card_link}>
                <div className={s.card_link__img}>
                  <img src={desktop} alt="desktop" />
                </div>
                <div className={s.card_link__title}>Website</div>
              </div>
            </div> */}
        </div>
      )}
    </section>
  );
});

export default PairInfoBody;
