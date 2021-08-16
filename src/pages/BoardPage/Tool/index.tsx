import React from 'react';
import Button from '../../../components/Button/index';

import s from './Tool.module.scss';

interface IToolProps {
  links: Array<string>;
  title: string;
  icon: string;
  keyName: string;
}

const Tool: React.FC<IToolProps> = React.memo(({ links, title, icon, keyName }) => {
  return (
    <section className={s.tool}>
      <div className={`${s.tool_header} ${s[keyName]}`}>
        <div className={s.tool_header__img}>
          <img src={icon} alt="icon" />
        </div>
      </div>
      <div className={s.tool_body}>
        <div className={s.tool_body__title}>
          {title} <span>TOOLS</span>
        </div>
        <div className={s.tool_body__buttons}>
          <Button to={links[0]}>Live New Pairs</Button>
          <Button to={links[1]}>Pair Explorer</Button>
          <Button to={links[2]}>Big Swap Explorer</Button>
        </div>
      </div>
    </section>
  );
});

export default Tool;
