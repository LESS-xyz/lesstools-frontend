import s from './PairInfoBottom.module.scss';
import thumbUp from '../../../../assets/img/icons/thumb-up.svg';
import thumbDown from '../../../../assets/img/icons/thumb-down.svg';

interface IPairInfoBottom {
  votesAmount: number;
  likes: number;
  dislikes: number;
}

const PairInfoBottom: React.FC<IPairInfoBottom> = ({ votesAmount, likes, dislikes }) => {
  return (
    <section className={s.block}>
      <div className={s.block_inner}>
        <div className={s.block_amount}>
          <div className={s.block_amount__img}>
            <img src={thumbUp} alt="likes" />
          </div>
          <div className={s.block_amount__value}>{likes}%</div>
        </div>
        <div className={s.block_bar}>
          <div className={s.block_bar__title}>Community trust ({votesAmount} votes)</div>
          <div className={s.block_bar__bar}>
            <div className={s.block_bar__bar_gradient} style={{ width: `${likes}%` }} />
          </div>
        </div>
        <div className={s.block_amount}>
          <div className={s.block_amount__img}>
            <img src={thumbDown} alt="dislikes" />
          </div>
          <div className={s.block_amount__value}>{dislikes}%</div>
        </div>
      </div>
    </section>
  );
};

export default PairInfoBottom;
