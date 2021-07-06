import s from './PairInfoBody.module.scss';
import ContractDetails from '../../../../components/Table/ContractDetails/index';
import shareImg from '../../../../assets/img/icons/share.svg';
import favImg from '../../../../assets/img/icons/favorite.svg';

const PairInfoBody: React.FC = () => {
  return (
    <section className={s.card}>
      <div className={s.card_inner}>
        <div className={s.card_header}>
          <div className={s.card_header__link}>
            <img src={shareImg} alt="shareImg" />
          </div>
          <div className={s.card_header__link}>
            <img src={favImg} alt="favImg" />
          </div>
          <div className={s.card_header__button}>Limit/Bot</div>
          <div className={s.card_header__button}>Trade</div>
        </div>
        <div className={s.card_body}>
          <div className={s.card_body__price}>$0.28118163</div>
          <div className={s.card_body__info}>
            <span>(24h: -8.34%) </span>0.00011453 ETH
          </div>
          <div className={s.card_body__properties}>
            <div className={s.card_body__property}>
              <div className={s.card_body__property_title}>Total liquidity:</div>
              <div className={s.card_body__property_value}>$3,140,920.17</div>
            </div>
            <div className={s.card_body__property}>
              <div className={s.card_body__property_title}>Daiy volume:</div>
              <div className={s.card_body__property_value}>$294,226.33</div>
            </div>
            <div className={s.card_body__property}>
              <div className={s.card_body__property_title}>Pooled LESS:</div>
              <div className={s.card_body__property_value}>673.81</div>
            </div>
            <div className={s.card_body__property}>
              <div className={s.card_body__property_title}>Pooled DEXT:</div>
              <div className={s.card_body__property_value}>$3,140,920.17</div>
            </div>
            <div className={s.card_body__property}>
              <div className={s.card_body__property_title}>Total tx:</div>
              <div className={s.card_body__property_value}>78572</div>
            </div>
            <div className={s.card_body__property}>
              <div className={s.card_body__property_title}>Holders:</div>
              <div className={s.card_body__property_value}>5882</div>
            </div>
          </div>
          <div className={s.market_cap_button}>View market cap</div>
          <div className={s.card_footer}>
            <div className={s.card_block}>
              <div className={s.card_block__title}>LESS Score</div>
            </div>
            <div className={s.card_block}>
              <div className={s.card_block__title}>Contract Details</div>
              <div className={s.card_block__body}>
                <ContractDetails data={['plus', 'proxy']} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PairInfoBody;
