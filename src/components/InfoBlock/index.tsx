import { useQuery } from '@apollo/client';
import { ETH_PRICE_QUERY } from '../../queries/index';
import BigNumber from 'bignumber.js/bignumber';

import s from './InfoBlock.module.scss';

import gasIcon from '../../assets/img/icons/gas.svg';
import hotIcon from '../../assets/img/icons/hot.svg';

interface IInfoBlockProps {
  topTokens: Array<string>;
}

const InfoBlock: React.FC<IInfoBlockProps> = ({ topTokens }) => {
  type response = { bundle: { ethPrice: string } };
  const { loading, data: ethPrice } = useQuery<response>(ETH_PRICE_QUERY, { pollInterval: 30000 });

  console.log(loading, ethPrice);

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
          <div className={s.cell_text}>13 GWEI</div>
        </div>
        <div className={s.cell}>
          <div className={s.cell_img}>
            <img src={hotIcon} alt="hotIcon" />
          </div>
          <div className={s.cell_text}>HOT PAIRS</div>
        </div>
      </div>
      <div className={s.right}>
        <div className={s.table}>
          {topTokens.map((token, index) => (
            <div key={`${token}${index * index}`} className={s.table_cell}>
              <span>#{index + 1}</span> {token}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoBlock;
