import { useWeb3Context } from '../../../contexts/Web3Connector';

import s from '../UserAccount.module.scss';

interface IVerifiedPageProps {
  userId: string;
}

const VerifiedPage: React.FC<IVerifiedPageProps> = ({ userId }) => {
  const { disconect } = useWeb3Context();

  return (
    <>
      <div className={s.block}>
        <div className={s.block_inner}>
          <div className={s.block_title}>Verified Wallet</div>
          <div className={s.block_wallet}>
            <span>{userId.slice(0, 15)}...</span>
          </div>
          <div className={s.block_balance}>
            Balance: <span>0.0 Less</span>
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
    </>
  );
};

export default VerifiedPage;
