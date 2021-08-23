import { observer } from 'mobx-react-lite';
import { useMst } from '../../store/store';
import { useWeb3Context } from '../../contexts/Web3Connector';
import { Web3Service } from '../../services/web3/index';
import AdBlock from '../../components/AdBlock/index';

import s from './UserAccount.module.scss';

import adImg from '../../assets/img/sections/ad/ad1.png';

const web3 = new Web3Service();

const UserAccount: React.FC = observer(() => {
  const { user } = useMst();
  const { handleInit } = useWeb3Context();

  const verifyUser = async () => {
    const signedStr = await web3.signMessage({
      userAdress: user.walletId || '',
      message: 'fdsfdsf',
    });
    console.log(signedStr);
  };

  return (
    <main className={s.page}>
      <div className={s.container}>
        <AdBlock adImg={adImg} />
        <div className={s.block}>
          <div className={s.block_inner}>
            <div className={s.block_title}>Connect your Wallet</div>
            <div className={s.block_subtitle}>Connect your wallet with LessTools.</div>
            {user.walletId ? (
              <div className={s.block_button}>
                {user.walletId.slice(0, 8)}...{user.walletId.slice(-5)}
              </div>
            ) : (
              <div
                role="button"
                className={s.block_button}
                tabIndex={0}
                onKeyDown={() => {}}
                onClick={() => handleInit()}
              >
                Connect to Metamask
              </div>
            )}
          </div>
        </div>
        <div className={s.block}>
          <div className={s.block_inner}>
            <div className={s.block_title}>Verify your wallet</div>
            <div className={s.block_subtitle}>
              <p>Verify your wallet into LessTools</p>
              <p>By verifying your wallet we will validate the ownership of your wallet.</p>
            </div>
            <div
              className={s.block_button}
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
              onClick={() => verifyUser()}
            >
              Verify your wallet
            </div>
          </div>
        </div>
      </div>
    </main>
  );
});

export default UserAccount;
