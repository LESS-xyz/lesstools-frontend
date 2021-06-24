import s from './MainPage.module.scss';
import TopBlock from './TopBlock/index';
import SecondBlock from './SecondBlock/index';
import CardsBlock from './CardsBlock/index';
import Partners from './Partners/index';
import TeamBlock from './TeamBlock/index';
import partnerLogo1 from '../../assets/img/sections/partners-logos/logo-1.svg';

const partnersLogos = [
  partnerLogo1,
  partnerLogo1,
  partnerLogo1,
  partnerLogo1,
  partnerLogo1,
  partnerLogo1,
  partnerLogo1,
  partnerLogo1,
];

const MainPage: React.FC = () => {
  return (
    <section className={s.page}>
      <div className={s.inner}>
        <TopBlock />
        <SecondBlock />
        <CardsBlock />
        <TeamBlock />
        <Partners title="PARTNERED PROJECTS" logos={partnersLogos} />
      </div>
    </section>
  );
};

export default MainPage;
