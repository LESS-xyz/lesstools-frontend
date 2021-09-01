import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import BigNumber from 'bignumber.js/bignumber';
import backend from '../../../services/backend';

import { useWeb3Context } from '../../../contexts/Web3Connector';
import { useMst } from '../../../store/store';
import config from '../../../config/index';

import s from '../UserAccount.module.scss';

const VerifiedPage: React.FC = observer(() => {
  const { disconect } = useWeb3Context();
  const [isCheckMark, setIsCheckMark] = useState(false);
  const { user } = useMst();

  const [prices, setPrices] = useState<{ holding: number; payment: number }>({
    holding: 50000,
    payment: 100,
  });

  const getPlanPrices = async () => {
    const res = await backend.getPlanPrices();
    setPrices({ holding: res.data.holding_amount_in_less, payment: res.data.monthly_price_in_usd });
  };

  useEffect(() => {
    getPlanPrices();
  }, []);

  return (
    <>
      <div className={s.block}>
        <div className={s.block_inner}>
          <div className={`${s.block_title} ${s.verification}`}>Verified Wallet</div>
          <div className={s.block_wallet}>
            <span>{user.walletId?.slice(0, 25)}...</span>
          </div>
          <div className={s.block_balance}>
            Balance: <span>{new BigNumber(user.lessBalance).toFormat(0)} Less</span>
          </div>
          <button
            type="button"
            onClick={() => disconect()}
            className={`${s.block_button} ${s.grey}`}
          >
            Disconnect wallet
          </button>
        </div>
      </div>
      {[user.planByHolding, user.planByPayments].some((plan) => plan !== 'Free') ? (
        <div className={s.block}>
          <div className={s.block_inner}>
            <div className={s.block_title}>Your wallet have an active subscription</div>
            <div className={s.block_subtitle}>Subscription: {user.userPlan} </div>
          </div>
        </div>
      ) : (
        <div className={s.block}>
          <div className={s.block_header}>
            ${prices.payment} paid / Monthly Subscription <br /> or <br />
            {new BigNumber(prices.holding).toFormat(0)} Less / HOLD
          </div>
          <div className={s.block_inner}>
            <div className={s.block_subtitle}>Your wallet does not have an active subscription</div>
            <div className={`${s.block_title} ${s.verification}`}>Step 1</div>
            <div className={s.block_subtitle}>
              Send ${prices.payment} in native currency of Ethereum or BSC networks or in LESS token
              to the specified address:
            </div>
            <div className={s.block_wallet}>
              <span>{config.WALLET_TO_PAY}</span>
            </div>
            <div className={s.block_subtext}>
              * if you send funds from another account or an exchange thosee funds will be lost.
            </div>
            <div className={s.check}>
              <button
                type="button"
                onClick={() => setIsCheckMark(true)}
                aria-label="check"
                className={`${s.check_mark} ${isCheckMark && s.active}`}
              />
              <div className={s.block_title}>Step 2</div>
            </div>
            <div className={s.block_subtitle}>
              {isCheckMark
                ? 'We are checking your transfer. This may take 5 minutes.'
                : 'I’ve alredy done the transfer'}
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default VerifiedPage;
