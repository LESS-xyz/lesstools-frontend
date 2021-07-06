import s from './PairInfoHeader.module.scss';
import copy from '../../../../assets/img/icons/copy.svg';
import etherscan from '../../../../assets/img/icons/table/actions-etherscan.svg';
import marketcap from '../../../../assets/img/icons/marketcap.svg';
import telegram from '../../../../assets/img/icons/telegram-gradient.svg';
import twitter from '../../../../assets/img/icons/twitter-gradient.svg';
import desktop from '../../../../assets/img/icons/desktop-gradient.svg';

const PairInfoHeader: React.FC = () => {
  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        return true;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <section className={s.pairInfoHeader}>
      <div className={s.logo}>logo</div>
      <div className={s.right}>
        <div className={s.right_top}>
          <div className={s.right_top__pair}>Less/DEXT</div>
          <div className={s.right_top__socials}>
            <a
              data-tip="View Contract"
              data-effect="solid"
              href="/"
              className={s.right_top__socials_link}
            >
              <img src={etherscan} alt="etherscan" />
            </a>
            <a
              data-tip="See token in CoinMarketCap"
              data-effect="solid"
              href="/"
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
          <div className={s.right_bottom__name}>(LESSTools)</div>
          <div className={s.right_bottom__contract}>
            <div>Token contract: </div>
            <div className={s.right_bottom__contract_body}>
              <div className={s.right_bottom__contract_body__copy}>
                0xa3b0e...a339553
                <div
                  className={s.copy}
                  data-tip="Copy to clipboard"
                  data-effect="solid"
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {}}
                  onClick={() => handleCopy('0xa3b0e...a339553')}
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
                onClick={() => handleCopy('contact adress')}
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
