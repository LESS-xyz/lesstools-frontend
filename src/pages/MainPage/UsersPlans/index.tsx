import s from './UsersPlans.module.scss';
import featureIcon from '../../../assets/img/icons/feature.svg';

const FreeUserPlanData = [
  'Real-time data & chart',
  'Pool explorer',
  'Pair explorer',
  'Bigswap explorer',
  'Multiswap windows',
  '4 favourite pairs',
  'Desktop price alerts',
  'Stable coin pairs',
  'Token / token pairs',
];

const StandartUserPlanData = [
  'Real-time data & chart',
  'Pool explorer',
  'Pair explorer',
  'Bigswap explorer',
  'Multiswap windows',
  'No limit favourite pairs',
  'My positions (P&L tracker)',
  'Trade analysis',
  'Wallet info & tracker',
  'Desktop/Mail/Telegram price alerts',
  'No advertisement',
  'Stable coin pairs',
  'Token / token pairs',
  'Limit order & trading bot (soon)',
];

const PremiumUserPlanData = [
  'Real-time data & chart',
  'Pool explorer',
  'Pair explorer',
  'Bigswap explorer',
  'Multiswap windows',
  'No limit favourite pairs',
  'My positions (P&L tracker)',
  'Trade analysis',
  'Wallet info & tracker',
  'Desktop/Mail/Telegram price alerts',
  'No advertisement',
  'Stable coin pairs',
  'Token / token pairs',
  'Dextshare',
  'Dextforce & Dextforce Ventures',
  'More exclusive upcoming features',
  'Limit order & trading bot (soon)',
];

interface IUserPlanProps {
  features: Array<string>;
  title: string;
  subtitle: string;
}

const UserPlan: React.FC<IUserPlanProps> = ({ features, title, subtitle }) => {
  return (
    <div className={s.card}>
      <div className={s.card_inner}>
        <div className={s.card_header}>
          <div className={s.card_header__title}>{title}</div>
          <div className={s.card_header__subtitle}>{subtitle}</div>
        </div>
        <div className={s.card_body}>
          {features.map((feature) => (
            <div className={s.card_body__feature}>
              <div className={s.card_body__feature__img}>
                <img src={featureIcon} alt="featureIcon" />
              </div>
              <div className={s.card_body__feature__text}>{feature}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const UsersPlans: React.FC = () => {
  return (
    <section className={s.block}>
      <div className={s.container}>
        <div className={s.inner}>
          <div className={s.title}>Less user plans</div>
          <div className={s.subtitle}>Choose your subscription tier and upgrade now!</div>
          <div className={s.cards}>
            <UserPlan title="Free" subtitle="- / hold" features={FreeUserPlanData} />
            <UserPlan
              title="Standart"
              subtitle="$150.00/$75.00 paid in Less/Monthly Subscription** -or- 20,000 Less/Hold*"
              features={StandartUserPlanData}
            />
            <UserPlan
              title="Premium"
              subtitle="100,000 LESS / hold*"
              features={PremiumUserPlanData}
            />
          </div>
          <div className={s.info}>
            <p>
              ** To qualify for the 50% DISCOUNT ($75 in LESS) you must hold at least 5000 LESS in
              your wallet apart from the payment.
            </p>
            <p>
              * Hold means that you must have the necessary tokens in your ERC20 wallet at the time
              of sign in and login, this process will be done through Metamask.
            </p>
          </div>
        </div>
      </div>
      <div className={s.block_bg} />
    </section>
  );
};

export default UsersPlans;
