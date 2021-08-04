// import { copyText } from '../../../../utils/copyText';
import { IToken } from '../../../../api/getTokensInfoFromCoingecko';
import { WHITELIST } from '../../../../data/whitelist';

import s from './PairInfoHeader.module.scss';

// import copy from '../../../../assets/img/icons/copy.svg';
import loader from '../../../../assets/loader.svg';

export interface ITokenData {
  derivedETH: string;
  derivedUSD: string;
  symbol: string;
  id: string;
}

interface IPairInfoHeaderProps {
  token0: ITokenData | null | undefined;
  token1: ITokenData | null | undefined;
  tokenInfoFromCoingecko: IToken | undefined;
}

const PairInfoHeader: React.FC<IPairInfoHeaderProps> = (props) => {
  let { token0, token1 } = props;
  const { tokenInfoFromCoingecko } = props;

  // чтобы weth был первый
  if (token1 && WHITELIST.includes(token1?.id)) {
    [token0, token1] = [token1, token0];
  }

  if (!token0?.id) {
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
            <span>{token0?.symbol} /</span>
            <span>{token1?.symbol}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PairInfoHeader;
