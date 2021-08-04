import s from './CommunityTrust.module.scss';
import thumbUp from '../../../../assets/img/icons/thumb-up.svg';
import thumbDown from '../../../../assets/img/icons/thumb-down.svg';

interface ICommunityTrust {
  votesAmount: number;
  likes: number;
  dislikes: number;
}

const CommunityTrust: React.FC<ICommunityTrust> = ({ votesAmount, likes, dislikes }) => {
  return (
    <section className={s.block}>
      <div className={s.block_inner}>
        <div className={s.block_top}>
          <div className={s.block_bar__title}>
            <p>Community trust</p>
            <span>({votesAmount} votes)</span>
          </div>
        </div>
        <div className={s.block_bottom}>
          <div className={s.block_amount}>
            <div className={s.block_amount__img}>
              <img src={thumbUp} alt="likes" />
            </div>
            <div className={s.block_amount__value}>{((likes / votesAmount) * 100).toFixed(2)}%</div>
          </div>
          <div className={s.block_bar}>
            <div className={s.block_bar__bar}>
              <div
                className={s.block_bar__bar_gradient}
                style={{ width: `${(likes / votesAmount) * 100}%` }}
              />
            </div>
          </div>
          <div className={s.block_amount}>
            <div className={s.block_amount__img}>
              <img src={thumbDown} alt="dislikes" />
            </div>
            <div className={s.block_amount__value}>
              {((dislikes / votesAmount) * 100).toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityTrust;
