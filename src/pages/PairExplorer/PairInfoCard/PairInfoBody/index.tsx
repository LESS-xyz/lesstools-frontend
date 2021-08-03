import { observer } from 'mobx-react-lite';
import BigNumber from 'bignumber.js/bignumber';

import { ITokenData } from '../PairInfoHeader';
import Loader from '../../../../components/Loader/index';

import s from './PairInfoBody.module.scss';

import favImg from '../../../../assets/img/icons/favorite.svg';
import shareImg from '../../../../assets/img/icons/share.svg';

const LessScore = () => (
  <div className={s.score}>
    <div className={s.score_bars}>
      <div data-tip="Information: 99" className={s.score_bars__item} />
      <div data-tip="Transactions: 99" className={s.score_bars__item} />
      <div data-tip="Holders: 99" className={s.score_bars__item} />
      <div data-tip="Creation: 99" className={s.score_bars__item} />
      <div data-tip="Pool: 99" className={s.score_bars__item} />
    </div>
    <div className={s.score_number}>99</div>
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
  };
  h24_ago_by_sum: Array<{ hourlyVolumeUSD: string }>;
}

interface IPairInfoBodyProps {
  loading: boolean;
  pairInfo: IPairInfo;
}

const PairInfoBody: React.FC<IPairInfoBodyProps> = observer((props) => {
  const { pairInfo } = props;
  let token0;
  let token1;
  let reserve0;
  let reserve1;

  if (pairInfo.base_info) {
    token0 = pairInfo.base_info.token0;
    token1 = pairInfo.base_info.token1;
    reserve0 = pairInfo.base_info.reserve0;
    reserve1 = pairInfo.base_info.reserve1;

    if (token1?.symbol === 'WETH') {
      [token0, token1] = [token1, token0];
      [reserve0, reserve1] = [reserve1, reserve0];
    }
  }

  return (
    <section className={s.card}>
      {!pairInfo.base_info ? (
        <div className={s.card_no_data}>
          <Loader />
        </div>
      ) : (
        <div className={s.card_inner}>
          <div className={s.card_header}>
            <div className={s.card_header__link}>
              <img src={shareImg} alt="shareImg" />
            </div>
            <div className={s.card_header__link}>
              <img src={favImg} alt="favImg" />
            </div>
            <div className={s.card_header__button}>Limit/Bot</div>
            <a
              rel="noreferrer"
              target="_blank"
              href={`https://app.uniswap.org/#/swap?outputCurrency=${token1?.id}&use=V2`}
              className={s.card_header__button}
            >
              Trade
            </a>
          </div>
          <div className={s.card_body}>
            <div className={s.card_body__price}>$ No Data</div>
            <div className={s.card_body__info}>
              <span className={s.card_body__info_percent}>(24h: -8.34%) </span>
              <span data-tip={`${token1?.derivedETH} ETH`}>
                {new BigNumber(token1?.derivedETH || 0).toFormat(6)} ETH
              </span>
            </div>
            <div className={s.card_body__properties}>
              <div className={s.card_body__property}>
                <div className={s.card_body__property_title}>Total liquidity:</div>
                <div className={s.card_body__property_value}>
                  ${new BigNumber(pairInfo.base_info.reserveUSD).toFormat(2)}
                </div>
              </div>
              <div className={s.card_body__property}>
                <div className={s.card_body__property_title}>Daiy volume:</div>
                <div className={s.card_body__property_value}>
                  $
                  {new BigNumber(
                    pairInfo.h24_ago_by_sum.reduce((acc, cur) => {
                      return acc + Number(cur.hourlyVolumeUSD);
                    }, 0),
                  ).toFormat(2)}
                </div>
              </div>
              <div className={s.card_body__property}>
                <div className={s.card_body__property_title}>Pooled {token0?.symbol}:</div>
                <div className={s.card_body__property_value}>
                  {new BigNumber(reserve0 || 0).toFormat(2)}
                </div>
              </div>
              <div className={s.card_body__property}>
                <div className={s.card_body__property_title}>Pooled {token1?.symbol}:</div>
                <div className={s.card_body__property_value}>
                  {new BigNumber(reserve1 || 0).toFormat(2)}
                </div>
              </div>
              <div className={s.card_body__property}>
                <div className={s.card_body__property_title}>Total tx:</div>
                <div className={s.card_body__property_value}>{pairInfo.base_info.txCount}</div>
              </div>
              <div className={s.card_body__property}>
                <div className={s.card_body__property_title}>Holders:</div>
                <div className={s.card_body__property_value}>
                  {pairInfo.base_info.liquidityProviderCount}
                </div>
              </div>
            </div>
            <div className={s.market_cap_button}>View market cap</div>
            <div className={s.card_footer}>
              <div className={s.card_block}>
                <div className={s.card_block__title}>LESS Score</div>
                <div className={s.card_block__body}>
                  <LessScore />
                </div>
              </div>
              {/* <div className={s.card_block}>
                <div className={s.card_block__title}>Contract Details</div>
                <div className={s.card_block__body}>
                  <ContractDetails data={['plus', 'proxy']} />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

export default PairInfoBody;
