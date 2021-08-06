import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import BigNumber from 'bignumber.js/bignumber';
import ReactTooltip from 'react-tooltip';

import { ITokenData } from '../PairInfoHeader';
import CommunityTrust from '../CommunityTrust/index';
import Loader from '../../../../components/Loader/index';

import { WHITELIST } from '../../../../data/whitelist';
import { IToken } from '../../../../api/getTokensInfoFromCoingecko';
import { copyText } from '../../../../utils/copyText';
import { useMst } from '../../../../store/store';
import MoreInfoModal from '../../../../components/Modals/MoreInfoModal/index';
import ShareModal from '../../../../components/Modals/ShareModal/index';

import s from './PairInfoBody.module.scss';

import favImg from '../../../../assets/img/icons/favorite.svg';
import shareImg from '../../../../assets/img/icons/share.svg';
import marketcap from '../../../../assets/img/icons/marketcap.svg';
import etherscan from '../../../../assets/img/icons/table/actions-etherscan.svg';

const LessScore = () => (
  <div className={s.score}>
    <div className={s.score_title}>LESS Score</div>
    <div className={s.score_inner}>
      <div className={s.score_bars}>
        <div data-tip="Information: 99" className={s.score_bars__item} />
        <div data-tip="Transactions: 99" className={s.score_bars__item} />
        <div data-tip="Holders: 99" className={s.score_bars__item} />
        <div data-tip="Creation: 99" className={s.score_bars__item} />
        <div data-tip="Pool: 99" className={s.score_bars__item} />
      </div>
      <div className={s.score_number}>99</div>
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
}

interface IPairInfoBodyProps {
  pairId: string;
  loading: boolean;
  pairInfo: IPairInfo;
  tokenInfoFromCoingecko: IToken | undefined;
}

const PairInfoBody: React.FC<IPairInfoBodyProps> = observer(
  ({ pairInfo, pairId, tokenInfoFromCoingecko }) => {
    if (!pairInfo.base_info) return <div>No data</div>;

    // tbr = token being reviewd
    const [tbr, setTbr] = useState(pairInfo.base_info.token1);
    const [otherToken, setOtherToken] = useState(pairInfo.base_info.token0);

    useEffect(() => {
      if (WHITELIST.includes(pairInfo.base_info.token1.id)) {
        setTbr(pairInfo.base_info.token0);
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
        {!pairInfo.base_info ? (
          <div className={s.card_no_data}>
            <Loader />
          </div>
        ) : (
          <div className={s.card_inner}>
            <div className={s.card_section}>
              <div className={s.card_section__inner}>
                <div className={s.card_section__left}>
                  <div className={s.card_copy}>
                    <div className={s.card_copy__contract}>
                      <span>Token contract: </span>
                      <div
                        className={s.card_copy__adress}
                        data-tip="Click to copy"
                        tabIndex={0}
                        onKeyDown={() => {}}
                        role="button"
                        onClick={() => copyText(tbr.id)}
                      >
                        {tbr.id.slice(0, 6)}...
                        {tbr.id.slice(-4)}
                      </div>
                    </div>
                    <div
                      tabIndex={0}
                      data-tip="Click to copy"
                      onKeyDown={() => {}}
                      role="button"
                      className={s.card_copy__adress}
                      onClick={() => copyText(pairId)}
                    >
                      Pair
                    </div>
                  </div>
                  <div className={s.card_body__price}>
                    ${new BigNumber(tbr.derivedUSD).toFormat(2)}
                  </div>
                  <div className={s.card_body__info}>
                    (24h: -8.34%) {new BigNumber(tbr.derivedETH).toFormat(2)} ETH
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
                </div>
                <div className={s.card_section__right}>
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
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://app.uniswap.org/#/swap?outputCurrency=${tbr.id}&use=V2`}
                    className={s.card_trade}
                  >
                    Trade
                  </a>
                  <div className={s.card_bot}>Limit/Bot</div>
                </div>
              </div>
            </div>
            <div className={s.card_section}>
              <div className={s.card_section__inner}>
                <div className={s.card_section__left}>
                  <div className={s.card_section__info}>
                    <div className={s.card_info}>
                      <div className={s.card_info__title}>Total liquidity:</div>
                      <div className={s.card_info__value}>
                        ${new BigNumber(pairInfo.base_info.reserveUSD).toFormat(2)}
                      </div>
                    </div>
                    <div className={s.card_info}>
                      <div className={s.card_info__title}>Daily volume:</div>
                      <div className={s.card_info__value}>
                        $
                        {new BigNumber(
                          pairInfo.h24_ago_by_sum.reduce((acc, cur) => {
                            return acc + Number(cur.hourlyVolumeUSD);
                          }, 0),
                        ).toFormat(2)}
                      </div>
                    </div>
                    <div className={s.card_info}>
                      <div className={s.card_info__title}>
                        Pooled {pairInfo.base_info.token0.symbol}:
                      </div>
                      <div className={s.card_info__value}>
                        {new BigNumber(pairInfo.base_info.reserve0).toFormat(2)}
                      </div>
                    </div>
                    <div className={s.card_info}>
                      <div className={s.card_info__title}>
                        Pooled {pairInfo.base_info.token1.symbol}:
                      </div>
                      <div className={s.card_info__value}>
                        {new BigNumber(pairInfo.base_info.reserve1).toFormat(2)}
                      </div>
                    </div>
                    <div className={s.card_info}>
                      <div className={s.card_info__title}>Total tx:</div>
                      <div className={s.card_info__value}>{pairInfo.base_info.txCount}</div>
                    </div>
                    <div className={s.card_info}>
                      <div className={s.card_info__title}>Holders:</div>
                      <div className={s.card_info__value}>soon</div>
                    </div>
                  </div>
                </div>
                <div className={s.card_section__right}>
                  <div className={s.card_links}>
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
                      <div className={s.card_link__img}>img</div>
                      <div className={s.card_link__title}>Twitter</div>
                    </div>
                    <div className={s.card_link}>
                      <div className={s.card_link__img}>img</div>
                      <div className={s.card_link__title}>Telegram</div>
                    </div>
                    <div className={s.card_link}>
                      <div className={s.card_link__img}>img</div>
                      <div className={s.card_link__title}>Website</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.card_sections}>
              <div className={s.card_section}>
                <ReactTooltip />
                <LessScore />
              </div>
              <div className={s.card_section}>
                <CommunityTrust votesAmount={905} likes={244} dislikes={4} />
              </div>
            </div>
          </div>
        )}
      </section>
    );
  },
);

export default PairInfoBody;
