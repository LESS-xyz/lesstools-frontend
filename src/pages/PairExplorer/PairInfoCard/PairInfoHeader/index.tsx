// import { copyText } from '../../../../utils/copyText';
import { IToken } from '../../../../api/getTokensInfoFromCoingecko';
import { WHITELIST } from '../../../../data/whitelist';

import s from './PairInfoHeader.module.scss';

// import copy from '../../../../assets/img/icons/copy.svg';
import loader from '../../../../assets/loader.svg';
import { useEffect, useState } from 'react';

export interface ITokenData {
  derivedETH: string;
  derivedUSD: string;
  symbol: string;
  id: string;
  totalSupply: string;
  name: string;
}

interface IPairInfoHeaderProps {
  token0: ITokenData | null | undefined;
  token1: ITokenData | null | undefined;
  tokenInfoFromCoingecko: IToken | undefined;
}

const PairInfoHeader: React.FC<IPairInfoHeaderProps> = ({
  token0,
  token1,
  tokenInfoFromCoingecko,
}) => {
  const [tbr, setTbr] = useState(token1);
  const [otherToken, setOtherToken] = useState(token0);

  useEffect(() => {
    if (token1 && WHITELIST.includes(token1.id)) {
      setTbr(token0);
      setOtherToken(token1);
    }
  }, [token1, token0]);

  if (!token0?.id || !token1?.id) {
    return <div>No data</div>;
  }

  return (
    <section className={s.pairInfoHeader}>
      <div className={s.logo}>
        <img
          src={tokenInfoFromCoingecko?.logoURI?.replace('thumb', 'large') || loader}
          alt="logoExample"
        />
      </div>
      <div className={s.right}>
        <div className={s.right_top}>
          <div className={s.right_top__pair}>
            <span>{otherToken?.symbol} /</span>
            <span>{tbr?.symbol}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PairInfoHeader;
