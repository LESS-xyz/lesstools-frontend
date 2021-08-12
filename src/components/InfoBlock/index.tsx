import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ETH_PRICE_QUERY } from '../../queries/index';
import BigNumber from 'bignumber.js/bignumber';
import { Link } from 'react-router-dom';

import { getGasPrice, IGasPrice } from '../../api/getGasPrice';
import { useMst } from '../../store/store';
import { WHITELIST } from '../../data/whitelist';

import s from './InfoBlock.module.scss';

import gasIcon from '../../assets/img/icons/gas.svg';
import hotIcon from '../../assets/img/icons/hot.svg';

const InfoBlock: React.FC = () => {
  const { hotPairs } = useMst();
  const [gasPrice, setGasPrice] = useState<IGasPrice | null>(null);

  type response = { bundle: { ethPrice: string } };
  const { data: ethPrice } = useQuery<response>(ETH_PRICE_QUERY, { pollInterval: 30000 });

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

  return (
    <section className={s.info}>
      <div className={s.left}>
        <div className={`${s.cell} ${s.fill}`}>
          ETH: ${new BigNumber(ethPrice?.bundle?.ethPrice || 0).toFormat(2)}
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
            {(gasPrice?.average || 0) / 10} GWEI
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
            {hotPairs.pairs.map((pair, index) => (
              <div key={`${pair.pair.id}`} className={s.table_cell}>
                <Link to={`/pair-explorer/${pair.pair.id}`}>
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
    </section>
  );
};

export default InfoBlock;
