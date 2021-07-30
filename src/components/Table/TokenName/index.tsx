import React from 'react';

import s from '../Table.module.scss';

const TokenName: React.FC<{ token: string }> = React.memo(({ token }) => {
  return <span className={s.token}>{token}</span>;
});

export default TokenName;
