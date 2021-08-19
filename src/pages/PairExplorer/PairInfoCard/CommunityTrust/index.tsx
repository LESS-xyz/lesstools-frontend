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
        <div className={s.title}>Community Trust</div>
        <div className={s.votes}>
          <div className={s.vote}>
            <div className={s.vote_img}>
              <img src={thumbUp} alt="thumbUp" />
            </div>
            <div className={s.vote_count}>{((likes / votesAmount) * 100).toFixed(2)}%</div>
          </div>
          <div className={s.info}>
            <div className={s.info_count}>
              <span>({votesAmount} votes)</span>
            </div>
            <div className={s.info_bar}>
              <div className={s.info_bar__bg} style={{ width: `${(likes / votesAmount) * 100}%` }} />
            </div>
          </div>
          <div className={s.vote}>
            <div className={s.vote_img}>
              <img src={thumbDown} alt="thumbUp" />
            </div>
            <div className={s.vote_count}>{((dislikes / votesAmount) * 100).toFixed(2)}%</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityTrust;
