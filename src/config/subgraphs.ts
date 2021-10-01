import { Networks } from './networks';

// https://api.thegraph.com/subgraphs/name/rock-n-block/honeyswap-lesstools

export enum Subgraphs {
  Uniswap = 'https://api.thegraph.com/subgraphs/id/QmWBu71RoJSf6LNYDTbKvUpXZH7puz9CHfGgyYq65DtMyY',
  Sushiswap = 'https://api.thegraph.com/subgraphs/name/rock-n-block/lesstools-sushiswap',
  SushiswapXdai = 'https://api.thegraph.com/subgraphs/name/rock-n-block/lesstools-sushiswap-xdai',
  SushiswapFantom = 'https://api.thegraph.com/subgraphs/name/rock-n-block/lesstools-sushiswap-fantom',
  SushiswapPolygon = 'https://api.thegraph.com/subgraphs/name/rock-n-block/lesstools-sushiswap-matic',
  SushiswapBinance = 'https://api.thegraph.com/subgraphs/name/rock-n-block/lesstools-sushiswap-bsc',
  Pancake = 'https://api.thegraph.com/subgraphs/name/rock-n-block/lesstools-pancake',
  Honeyswap = 'https://api.thegraph.com/subgraphs/name/rock-n-block/honeyswap-lesstools',
  Spookyswap = 'https://api.thegraph.com/subgraphs/name/rock-n-block/spookyswap-lesstools',
  Mdexbsc = 'https://api.thegraph.com/subgraphs/name/rock-n-block/mdex-bsc-lesstools',
  Biswap = 'https://api.thegraph.com/subgraphs/name/rock-n-block/biswap-lesstools',
  Babyswap = 'https://api.thegraph.com/subgraphs/name/rock-n-block/babyswap-lesstools',
  Apeswap = 'https://api.thegraph.com/subgraphs/name/rock-n-block/apeswap-lesstools',
  Spiritswap = 'https://api.thegraph.com/subgraphs/name/rock-n-block/spiritswap-lesstools',
  Joetrader = 'https://api.thegraph.com/subgraphs/name/rock-n-block/joe-trader-lesstools',
  Pangolin = 'https://api.thegraph.com/subgraphs/name/rock-n-block/pangolin-lesstools',
  Quickswap = 'https://api.thegraph.com/subgraphs/name/rock-n-block/lesstools-quickswap',
}

export interface ISubgraphsByNetworks {
  [key: string]: string[];
}

export const SubgraphsByNetworks: ISubgraphsByNetworks = {
  [Networks.Ethereum]: [
    Subgraphs.Uniswap,
  ],
  [Networks.Binance]: [
    Subgraphs.Sushiswap,
    Subgraphs.Apeswap,
    Subgraphs.Babyswap,
    Subgraphs.Biswap,
    Subgraphs.Mdexbsc,
    Subgraphs.Pancake,
    Subgraphs.SushiswapBinance,
  ],
  [Networks.Polygon]: [
    Subgraphs.Quickswap,
    Subgraphs.SushiswapPolygon,
  ],
  [Networks.Xdai]: [
    Subgraphs.Honeyswap,
    Subgraphs.SushiswapXdai,
  ],
  [Networks.Fantom]: [
    Subgraphs.Spiritswap,
    Subgraphs.Spookyswap,
    Subgraphs.SushiswapFantom,
  ],
  [Networks.Avalanche]: [
    Subgraphs.Joetrader,
    Subgraphs.Pangolin,
  ],
};

export interface ISubgraphsByExchange {
  [key: string]: string;
}

export const SubgraphsByExchange: ISubgraphsByExchange = {
  Uniswap: Subgraphs.Uniswap,
  Sushiswap: Subgraphs.Sushiswap,
  Pancake: Subgraphs.Pancake,
  Honeyswap: Subgraphs.Honeyswap,
  Spookyswap: Subgraphs.Spookyswap,
  Mdexbsc: Subgraphs.Mdexbsc,
  Biswap: Subgraphs.Biswap,
  Babyswap: Subgraphs.Babyswap,
  Apeswap: Subgraphs.Apeswap,
  Spiritswap: Subgraphs.Spiritswap,
  Joetrader: Subgraphs.Joetrader,
  Pangolin: Subgraphs.Pangolin,
  Quickswap: Subgraphs.Quickswap,
};
