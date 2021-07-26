import s from './InfoBlock.module.scss';

import gasIcon from '../../assets/img/icons/gas.svg';
import hotIcon from '../../assets/img/icons/hot.svg';

interface IInfoBlockProps {
  topTokens: Array<string>;
}

const InfoBlock: React.FC<IInfoBlockProps> = ({ topTokens }) => {
  return (
    <section className={s.info}>
      <div className={s.left}>
        <div className={`${s.cell} ${s.fill}`}>ETH: $2469.35</div>
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
