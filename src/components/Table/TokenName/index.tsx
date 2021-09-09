import React from 'react';
import { Link } from 'react-router-dom';

import { useMst } from '../../../store/store';

import s from '../Table.module.scss';

const TokenName: React.FC<{ token: string; pairId: string }> = React.memo(({ token, pairId }) => {
  const { currentExchange } = useMst();
  return (
    <Link to={`/${currentExchange.exchange}/pair-explorer/${pairId}`} className={s.token}>
      <span>{token}</span>
    </Link>
  );
});

export default TokenName;
