import React from 'react';
import s from './TeamBlock.module.scss';
import man from '../../../assets/img/sections/team-photos/man.png';
import twitterIcon from '../../../assets/img/icons/twitter-team-link.svg';
import telegramIcon from '../../../assets/img/icons/telegram-team-link.svg';

interface ICardProps {
  img: string;
  name: string;
  country: string;
  lang: string;
  description: string;
  twitter: string;
  telegram: string;
}

const Card: React.FC<ICardProps> = ({
  img,
  name,
  country,
  lang,
  description,
  twitter,
  telegram,
}) => {
  return (
    <div className={s.card}>
      <div className={s.card_inner}>
        <div className={s.card_mainInfo}>
          <div className={s.card_mainInfo__img}>
            <img src={img} alt="img" />
          </div>
          <div className={s.card_mainInfo__right}>
            <div className={s.card_mainInfo__name}>{name}</div>
            <div className={s.card_mainInfo__country}>{country}</div>
            <div className={s.card_mainInfo__lang}>{lang}</div>
          </div>
        </div>
        <div className={s.card_description}>{description}</div>
        <div className={s.card_links}>
          <a href={twitter} className={s.card_link}>
            <img src={twitterIcon} alt="twitterIcon" />
          </a>
          <a href={telegram} className={s.card_link}>
            <img src={telegramIcon} alt="telegramIcon" />
          </a>
        </div>
      </div>
    </div>
  );
};

const TeamBlock: React.FC = () => {
  return (
    <section className={s.block}>
      <div className={s.container}>
        <div className={s.inner}>
          <div className={s.title}>TEAM MEMBERS</div>
          <div className={s.cards}>
            <Card
              img={man}
              name="John Smith"
              country="USA"
              lang="English"
              description="Co-founder of Less Network, Lead Software Engineer & Architect"
              twitter="/"
              telegram="/"
            />
            <Card
              img={man}
              name="John Smith"
              country="USA"
              lang="English"
              description="Co-founder of Less Network, Lead Software Engineer & Architect"
              twitter="/"
              telegram="/"
            />
            <Card
              img={man}
              name="John Smith"
              country="USA"
              lang="English"
              description="Co-founder of Less Network, Lead Software Engineer & Architect"
              twitter="/"
              telegram="/"
            />
            <Card
              img={man}
              name="John Smith"
              country="USA"
              lang="English"
              description="Co-founder of Less Network, Lead Software Engineer & Architect"
              twitter="/"
              telegram="/"
            />
            <Card
              img={man}
              name="John Smith"
              country="USA"
              lang="English"
              description="Co-founder of Less Network, Lead Software Engineer & Architect"
              twitter="/"
              telegram="/"
            />
            <Card
              img={man}
              name="John Smith"
              country="USA"
              lang="English"
              description="Co-founder of Less Network, Lead Software Engineer & Architect"
              twitter="/"
              telegram="/"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamBlock;
