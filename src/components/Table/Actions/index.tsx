import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useLocation } from 'react-router-dom';

import { useMst } from '../../../store/store';

import s from './Actions.module.scss';

import etherscan from '../../../assets/img/icons/table/actions-etherscan.svg';
import bsc from '../../../assets/img/icons/table/actions-bsc.svg';
import polygon from '../../../assets/img/icons/table/actions-polygon.svg';
import xdai from '../../../assets/img/icons/table/actions-xdai.svg';
import avalanche from '../../../assets/img/icons/table/actions-avalanche.svg';
import fantom from '../../../assets/img/icons/table/actions-fantom.svg';
import uniswap from '../../../assets/img/icons/table/actions-uniswap.svg';
import sushiswap from '../../../assets/img/icons/table/actions-sushiswap.svg';
import unicrypt from '../../../assets/img/icons/table/actions-unicrypt.svg';
import compass from '../../../assets/img/icons/table/actions-compass.svg';

// interface IActionsProps {
//   actions: {
//     uniswap?: string;
//     unicrypt?: string;
//     liveData?: string;
//     binance?: string;
//     ethereum?: string;
//     polygon?: string;
//     xdai?: string;
//     avalanche?: string;
//     fantom?: string;
//   };
// }

const explorersLinks: { [key: string]: string } = {
  binance: 'https://bscscan.com/address/',
  ethereum: 'https://etherscan.io/address/',
  polygon: 'https://polygonscan.com/address/',
  xdai: 'https://blockscout.com/xdai/mainnet/address/',
  avalanche: 'https://avascan.info/blockchain/c/address/',
  fantom: 'https://explorer.fantom.network/address/',
};

const Actions: React.FC<any> = observer(({ actions }) => {
  const { currentExchange } = useMst();
  const location = useLocation();
  const network = location.pathname.split('/')[1].toLowerCase();

  const getImage = (actionNetwork: string) => {
    let src;

    switch (actionNetwork) {
      case 'binance':
        src = bsc;
        break;
      case 'ethereum':
        src = etherscan;
        break;
      case 'polygon':
        src = polygon;
        break;
      case 'xdai':
        src = xdai;
        break;
      case 'avalanche':
        src = avalanche;
        break;

      default:
        src = fantom;
        break;
    }
    return <img src={src} alt={`${src}`} />;
  };

  return (
    <div className={s.block}>
      {actions.uniswap && (
        <a
          data-tip={`Buy at uniswap: ${actions.uniswap}`}
          data-place="left"
          data-effect="solid"
          href={
            currentExchange.exchange === 'uniswap'
              ? `https://app.uniswap.org/#/swap?outputCurrency=${actions.uniswap}`
              : `https://app.sushi.com/swap?outputCurrency=${actions.uniswap}`
          }
          target="_blank"
          rel="noreferrer"
        >
          <img src={currentExchange.exchange === 'uniswap' ? uniswap : sushiswap} alt="uniswap" />
        </a>
      )}
      {actions[network] && (
        <a
          data-tip={`Tx: ${actions[network]}`}
          data-place="left"
          data-effect="solid"
          href={`${explorersLinks[network]}${actions.liveData}`}
          target="_blank"
          rel="noreferrer"
        >
          {getImage(network)}
        </a>
      )}
      {actions.unicrypt && (
        <a
          data-tip="See at unicrypt"
          data-place="left"
          data-effect="solid"
          href={`https://app.unicrypt.network/amm/uni-v2/pair/${actions.unicrypt}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src={unicrypt} alt="unicrypt" />
        </a>
      )}
      {actions.liveData && (
        <Link
          to={`/${network}/pair-explorer/${actions.liveData}`}
          data-tip={`Pair Explorer: ${actions.liveData}`}
          data-place="left"
          data-effect="solid"
        >
          <img src={compass} alt="compass" />
        </Link>
      )}
    </div>
  );
});

export default Actions;
