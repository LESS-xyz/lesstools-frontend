import { NavLink } from 'react-router-dom';
import { useState } from 'react';

// import Button from '../Button/index';
import PopUp from './PopUp';

import s from './Header.module.scss';

import logo from '../../assets/img/icons/logo.svg';
import ethLogo from '../../assets/img/icons/eth-logo-colorful.svg';
import bnbLogo from '../../assets/img/icons/bnb-logo-colorful.svg';
import maticLogo from '../../assets/img/icons/matic-logo.svg';
// import arrow from '../../assets/img/icons/arrow-down-gradient.svg';

const cryptoLogos = new Map();
cryptoLogos.set('Ethereum', ethLogo);
cryptoLogos.set('Binance-Smart-Chain', bnbLogo);
cryptoLogos.set('Matic', maticLogo);

const Header: React.FC = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.inner}>
          {isPopUpOpen && <PopUp setIsPopUpOpen={setIsPopUpOpen} setCurrentCrypto={() => {}} />}
          <div className={s.left}>
            <NavLink to="/" className={s.logo}>
              <div className={s.logo_img}>
                <img src={logo} alt="Less-logo" />
              </div>
              <div className={s.logo_text}>
                less
                <span>Tools</span>
              </div>
            </NavLink>
            <nav className={s.navigation}>
              <NavLink
                to="/board"
                activeClassName={s.active}
                className={s.nav_link}
                data-text="Board"
              >
                Board
              </NavLink>
              <NavLink
                to="/live-new-pairs"
                activeClassName={s.active}
                className={s.nav_link}
                data-text="Live New Pairs"
              >
                Live New Pairs
              </NavLink>
              <NavLink
                isActive={(_, location) => location.pathname.includes('/pair-explorer/')}
                to="/pair-explorer/0xcc3d1ecef1f9fd25599dbea2755019dc09db3c54"
                activeClassName={s.active}
                className={s.nav_link}
                data-text="Pair Explorer"
              >
                Pair Explorer
              </NavLink>
              <NavLink
                to="/big-swap-explorer"
                activeClassName={s.active}
                className={s.nav_link}
                data-text="Big Swap Explorer"
              >
                Big Swap Explorer
              </NavLink>
              <NavLink
                to="/others"
                activeClassName={s.active}
                className={s.nav_link}
                data-text="Others"
              >
                Others
              </NavLink>
            </nav>
          </div>
          {/* <div className={s.right}>
            <div className={s.buttons}>
              <Button filled marginRight={20} onClick={() => {}}>
                Connect Wallet
              </Button>
              <Button to="/create-pool">Create Pool</Button>
              <Button marginRight={0} onClick={() => setIsPopUpOpen(!isPopUpOpen)}>
                <div className={s.button_body}>
                  <div className={s.crypto_logo}>
                    <img src={cryptoLogos.get('Ethereum')} alt="crypto-logo" />
                  </div>
                  <div className={s.current_crypto}>Ethereum</div>
                  <div className={`${s.arrow} ${isPopUpOpen && s.active}`}>
                    <img src={arrow} alt="arrow" />
                  </div>
                </div>
              </Button>
            </div>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
