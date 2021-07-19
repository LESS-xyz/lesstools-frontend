import BigNumber from 'bignumber.js/bignumber';

interface ITokenPrice {
  usd: number;
  eth: number;
  isUsd: boolean;
}

const TokenPrice: React.FC<ITokenPrice> = ({ usd, eth, isUsd }) => {
  return <div>{isUsd ? `$${usd}` : `${new BigNumber(eth).toFormat()} ETH`}</div>;
};

export default TokenPrice;
