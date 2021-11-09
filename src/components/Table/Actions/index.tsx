import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useLocation } from 'react-router-dom';

import { useMst } from '../../../store/store';

import s from './Actions.module.scss';

import etherscan from '../../../assets/img/icons/table/actions-etherscan.svg';
import uniswap from '../../../assets/img/icons/table/actions-uniswap.svg';
import sushiswap from '../../../assets/img/icons/table/actions-sushiswap.svg';
import unicrypt from '../../../assets/img/icons/table/actions-unicrypt.svg';
import compass from '../../../assets/img/icons/table/actions-compass.svg';

interface IActionsProps {
  actions: {
    uniswap?: string;
    unicrypt?: string;
    etherscan?: string;
    liveData?: string;
  };
}

const Actions: React.FC<IActionsProps> = observer(({ actions }) => {
  const { currentExchange } = useMst();
  const location = useLocation();
  const network = location.pathname.split('/')[1].toLowerCase();

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
      {actions.etherscan && (
        <a
          data-tip={`Tx: ${actions.etherscan}`}
          data-place="left"
          data-effect="solid"
          href={`https://etherscan.io/tx/${actions.etherscan}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src={etherscan} alt="etherscan" />
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
