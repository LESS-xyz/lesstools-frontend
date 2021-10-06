import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import BigNumber from 'bignumber.js/bignumber';
import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { getGasPrice, IGasPrice } from '../../api/getGasPrice';
import { useMst } from '../../store/store';
import { WHITELIST } from '../../data/whitelist';
import { ETH_PRICE_QUERY } from '../../queries/index';
import { uniswapSubgraph, sushiswapSubgraph } from '../../index';
import { useStoreContext } from "../../contexts/MobxConnector";

import s from './InfoBlock.module.scss';

import gasIcon from '../../assets/img/icons/gas.svg';
import hotIcon from '../../assets/img/icons/hot.svg';
import { ReactComponent as MetaMaskIcon } from '../../assets/img/icons/metamask.svg';
import { uppercaseFirstLetter } from '../../utils/prettifiers';
import { Networks } from '../../config/networks';
import { is } from '../../utils/comparers';

const InfoBlock: React.FC<any> = observer(() => {
  const { user }: { user: any } = useMst();
  const { store } = useStoreContext();
  const { hotPairs } = store;

  const [gasPrice, setGasPrice] = useState<IGasPrice | null>(null);

  const location = useLocation();

  const network = uppercaseFirstLetter(location.pathname.split('/')[1] || Networks.Ethereum);

  type response = { bundle: { ethPrice: string } };
  const { data: ethPrice } = useQuery<response>(ETH_PRICE_QUERY, {
    pollInterval: 30000,
    client: is(network, Networks.Ethereum) ? uniswapSubgraph : sushiswapSubgraph,
  });

  // get gas price every 10 sec
  useEffect(() => {
    getGasPrice().then((res) => setGasPrice(res));

    const timer = setInterval(() => {
      getGasPrice().then((res) => setGasPrice(res));
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    console.log('InfoBlock:', { hotPairs });
  }, [hotPairs]);

  return (
    <section className={s.info}>
      <div className={s.info_inner}>
        <div className={s.left}>
          <div className={s.cell}>
            <div className={s.cell_text}>
              ETH: ${new BigNumber(ethPrice?.bundle?.ethPrice || 0).toFormat(2)}
            </div>
          </div>
          <div className={s.cell}>
            <div className={s.cell_img}>
              <img src={gasIcon} alt="gasIcon" />
            </div>
            <div
              data-multiline
              data-tip={`Low: ${(gasPrice?.safeLow || 0) / 10} <br/> Medium: ${
                (gasPrice?.average || 0) / 10
              } <br/> Fast: ${(gasPrice?.fast || 0) / 10}`}
              data-effect="solid"
              data-place="bottom"
              className={s.cell_text}
            >
              <span>{(gasPrice?.average || 0) / 10} GWEI</span>
            </div>
          </div>
          <div className={s.cell}>
            <div className={s.cell_img}>
              <img src={hotIcon} alt="hotIcon" />
            </div>
            <div className={s.cell_text}>HOT PAIRS</div>
          </div>
        </div>
        <div className={s.right}>
          <div className={s.marquee}>
            <div className={s.table}>
              {hotPairs && hotPairs[network]?.map((pair: any, index: number) => (
                <div key={`${pair.pair.id}`} className={s.table_cell}>
                  <Link to={`/${network}/pair-explorer/${pair.pair.id}`}>
                    <span>#{index + 1}</span>{' '}
                    {WHITELIST.includes(pair.pair.token0.id)
                      ? pair.pair.token1.symbol
                      : pair.pair.token0.symbol}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Link to="/user-account" className={s.metamask_link}>
          <div className={s.metamask_link__inner}>
            <MetaMaskIcon className={s.metamask_link__inner_img} />
             <span>
              {/* eslint-disable-next-line */}
              {!user.walletId
                ? 'Connect'
                : !user.isVerified
                ? 'Verify'
                : `${user.walletId.slice(0, 5)}...${user.walletId.slice(-5)}`}
             </span>
          </div>
        </Link>
      </div>
    </section>
  );
});

export default InfoBlock;
