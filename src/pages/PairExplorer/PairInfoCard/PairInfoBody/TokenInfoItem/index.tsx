import React from 'react';
import s from '../PairInfoBody.module.scss';

interface ITokenInfoItemProps {
  title: string;
  value: string;
}

const TokenInfoItem: React.FC<ITokenInfoItemProps> = ({ title, value }) => {
  return (
    <div className={s.token_info__item}>
      <div className={s.token_info__item__title}>{title}</div>
      <div className={s.token_info__item__value}>{value}</div>
    </div>
  );
};

export default TokenInfoItem;
