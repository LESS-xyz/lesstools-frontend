import s from './CardsBlock.module.scss';
import cardImgResponsive from '../../../assets/img/sections/main/card-responsive.png';
import cardImgSubscriptions from '../../../assets/img/sections/main/card-subscriptions.png';
import cardImgData from '../../../assets/img/sections/main/card-data.png';
import cardImgNotifications from '../../../assets/img/sections/main/card-notifications.png';

interface ICardTextProps {
  title: string;
  subtitle: string;
}

interface ICardImgProps {
  img: string;
}

const CardText: React.FC<ICardTextProps> = ({ title, subtitle }) => {
  return (
    <div className={s.card_text}>
      <div className={s.card_text__inner}>
        <span className={s.card_text__title}>{title}</span>
        <div className={s.card_text__subtitle}>{subtitle}</div>
      </div>
    </div>
  );
};

const CardImg: React.FC<ICardImgProps> = ({ img }) => {
  return (
    <div className={s.card_img}>
      <div className={s.card_img__inner}>
        <div className={s.card_img__img}>
          <img src={img} alt="card-img" />
        </div>
      </div>
    </div>
  );
};

const CardsBlock: React.FC = () => {
  return (
    <section className={s.block}>
      <div className={s.container}>
        <div className={s.inner}>
          <div className={s.cards}>
            <CardText
              title="RESPONSIVE"
              subtitle="LESSTools works on any device: desktop, tablet or mobile."
            />
            <CardImg img={cardImgResponsive} />
            <CardImg img={cardImgSubscriptions} />
            <CardText
              title="SUBSCRIPTIONS"
              subtitle="Purchase LESS via exchanges to enable LESS subscriptions."
            />
            <CardText
              title="STORE YOUR DATA"
              subtitle="Save your data and access it from any device."
            />
            <CardImg img={cardImgData} />
            <CardImg img={cardImgNotifications} />
            <CardText title="NOTIFICATIONS" subtitle="Set-up your live notifications." />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardsBlock;
