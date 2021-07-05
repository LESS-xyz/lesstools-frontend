export interface IRowBigSwap {
  pair: string;
  time: string | Date;
  type: 'sell' | 'buy';
  quantity: number;
  totalEth: number;
  totalUsd: number;
  change: number;
  others: { liveData: string; etherscan: string };
}

export interface IRowLiveNewPairs {
  token: string;
  listedSince: string | Date;
  actions: { uniswap?: string; unicrypt?: string; etherscan?: string; liveData?: string };
  contractDetails: Array<'plus' | 'lock' | 'proxy' | 'cash'>;
  tokenPrice: { usd: number; eth: number };
  totalLiquidity: number;
  poolAmount: number;
  poolVariation: number;
  poolRemaining: number;
}

export interface IRowPairExplorer {
  data: string | Date;
  type: 'sell' | 'buy';
  priceUsd: number;
  priceEth: number;
  amountEth: number;
  totalEth: number;
  maker: string;
  others: { liveData: string; etherscan: string };
}
