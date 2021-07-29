import { copyText } from '../../../../utils/copyText';
import { IToken } from '../../../../api/getTokensInfoFromCoingecko';

import s from './PairInfoHeader.module.scss';

import copy from '../../../../assets/img/icons/copy.svg';
import etherscan from '../../../../assets/img/icons/table/actions-etherscan.svg';
import marketcap from '../../../../assets/img/icons/marketcap.svg';
import telegram from '../../../../assets/img/icons/telegram-gradient.svg';
import twitter from '../../../../assets/img/icons/twitter-gradient.svg';
import desktop from '../../../../assets/img/icons/desktop-gradient.svg';
// import logoExample from '../../../../assets/img/icons/logo.svg';
import loader from '../../../../assets/loader.svg';

export interface ITokenData {
  derivedETH: string;
  symbol: string;
  id: string;
}

interface IPairInfoHeaderProps {
  token0: ITokenData | null | undefined;
  token1: ITokenData | null | undefined;
  pairId: string;
  tokenInfoFromCoingecko: IToken | undefined;
}

const PairInfoHeader: React.FC<IPairInfoHeaderProps> = (props) => {
  let { token0, token1 } = props;
  const { pairId, tokenInfoFromCoingecko } = props;

  // чтобы weth был первый
  if (token1?.symbol === 'WETH') {
    [token0, token1] = [token1, token0];
  }

  if (!token0?.id) {
    return <div>No data</div>;
  }

  return (
    <section className={s.pairInfoHeader}>
      <div className={s.logo}>
        <img
          src={tokenInfoFromCoingecko?.logoURI?.replace('thumb', 'large') || loader}
          alt="logoExample"
        />
      </div>
      <div className={s.right}>
        <div className={s.right_top}>
          <div className={s.right_top__pair}>
            <span>{token0?.symbol} /</span>
            <span>{token1?.symbol}</span>
          </div>
          <div className={s.right_top__socials}>
            <a
              data-tip="View Contract"
              data-effect="solid"
              rel="noreferrer"
              target="_blank"
              href={`https://etherscan.io/token/${token1?.id}`}
              className={s.right_top__socials_link}
            >
              <img src={etherscan} alt="etherscan" />
            </a>
            <a
              data-tip="See token in CoinMarketCap"
              data-effect="solid"
              href={`https://coinmarketcap.com/currencies/${tokenInfoFromCoingecko?.name?.replaceAll(
                ' ',
                '-',
              )}/`}
              rel="noreferrer"
              target="_blank"
              className={s.right_top__socials_link}
            >
              <img src={marketcap} alt="marketcap" />
            </a>
            <a
              data-tip="Telegram"
              data-effect="solid"
              href="/"
              className={s.right_top__socials_link}
            >
              <img src={telegram} alt="telegram" />
            </a>
            <a
              data-tip="Twitter"
              data-effect="solid"
              href="/"
              className={s.right_top__socials_link}
            >
              <img src={twitter} alt="twitter" />
            </a>
            <a data-tip="Web" data-effect="solid" href="/" className={s.right_top__socials_link}>
              <img src={desktop} alt="desktop" />
            </a>
          </div>
        </div>
        <div className={s.right_bottom}>
          <div className={s.right_bottom__name}>({token1?.symbol})</div>
          <div className={s.right_bottom__contract}>
            <div>Token contract: </div>
            <div className={s.right_bottom__contract_body}>
              <div className={s.right_bottom__contract_body__copy}>
                {token1?.id.slice(0, 7)}...{token1?.id.slice(-4)}
                <div
                  className={s.copy}
                  data-tip="Copy to clipboard"
                  data-effect="solid"
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {}}
                  onClick={() => copyText(token1 ? token1.id : '')}
                >
                  <img src={copy} alt="copy" />
                </div>
              </div>
            </div>
          </div>
          <div className={s.right_bottom__pair}>
            Pair
            <div className={s.right_bottom__contract_body__copy}>
              <div
                className={s.copy}
                data-tip="Copy to clipboard"
                data-effect="solid"
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
                onClick={() => {
                  copyText(pairId);
                }}
              >
                <img src={copy} alt="copy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PairInfoHeader;
