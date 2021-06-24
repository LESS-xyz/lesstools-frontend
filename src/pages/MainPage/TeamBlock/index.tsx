import React from 'react';
import s from './TeamBlock.module.scss';
import man from '../../../assets/img/sections/team-photos/man.png';

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
          <div className={s.card_link}>{twitter}</div>
          <div className={s.card_link}>{telegram}</div>
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
