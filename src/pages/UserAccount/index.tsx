import AdBlock from '../../components/AdBlock/index';
import adImg from '../../assets/img/sections/ad/ad1.png';

import s from './UserAccount.module.scss';

const UserAccount: React.FC = () => {
  return (
    <main className={s.page}>
      <div className={s.container}>
        <AdBlock adImg={adImg} />
        <div className={s.block}>
          <div className={s.block_inner}>
            <div className={s.block_title}>Connect your Wallet</div>
            <div className={s.block_subtitle}>Connect your wallet with LessTool.</div>
            <div className={s.block_button}>Connect to Metamask</div>
          </div>
        </div>
        <div className={s.block}>
          <div className={s.block_inner}>
            <div className={s.block_title}>Verify your wallet</div>
            <div className={s.block_subtitle}>
              <p>Verify your wallet into LessTools</p>
              <p>By verifying your wallet we will validate the ownership of your wallet.</p>
            </div>
            <div className={s.block_button}>Verify your wallet</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserAccount;
