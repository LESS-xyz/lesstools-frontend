import uniswap from '../assets/img/sections/live-new-pairs/uniswap.svg';
import ethereum from '../assets/img/icons/eth-logo.svg';
import { Networks } from "./networks";

// todo: remove (used in mobx)
export type Exchange = 'uniswap' | 'sushiswap' | 'quickswap' | 'ethereum';

export enum Exchanges {
  Uniswap = 'Uniswap',
  Sushiswap = 'Sushiswap',
  SushiswapXdai = 'SushiswapXdai',
  SushiswapFantom = 'SushiswapFantom',
  SushiswapPolygon = 'SushiswapPolygon',
  SushiswapBinance = 'SushiswapBinance',
  Pancake = 'Pancake',
  Quickswap = 'Quickswap',
  Honeyswap = 'Honeyswap',
  Spookyswap = 'Spookyswap',
  Mdexbsc = 'Mdexbsc',
  Biswap = 'Biswap',
  Babyswap = 'Babyswap',
  Apeswap = 'Apeswap',
  Spiritswap = 'Spiritswap',
  Joetrader = 'Joetrader',
  Pangolin = 'Pangolin',
}

export interface IExchangesIcons {
  [key: string]: string
}

// todo
export const ExchangesIcons: IExchangesIcons = {
  [Exchanges.Uniswap]: uniswap,
  [Exchanges.Sushiswap]: ethereum,
  [Exchanges.SushiswapXdai]: ethereum,
  [Exchanges.SushiswapFantom]: ethereum,
  [Exchanges.SushiswapPolygon]: ethereum,
  [Exchanges.SushiswapBinance]: ethereum,
  [Exchanges.Pancake]: uniswap,
  [Exchanges.Quickswap]: uniswap,
  [Exchanges.Honeyswap]: uniswap,
  [Exchanges.Spookyswap]: uniswap,
  [Exchanges.Mdexbsc]: uniswap,
  [Exchanges.Biswap]: uniswap,
  [Exchanges.Babyswap]: uniswap,
  [Exchanges.Apeswap]: uniswap,
  [Exchanges.Spiritswap]: uniswap,
  [Exchanges.Joetrader]: uniswap,
  [Exchanges.Pangolin]: uniswap,
}

export interface IUnicryptExchangesNames {
  [key: string]: string
}

export const UnicryptExchangesNames: IUnicryptExchangesNames = {
  [Exchanges.Uniswap]: 'uni-v2',
  [Exchanges.Sushiswap]: 'sushi-v1',
  [Exchanges.SushiswapXdai]: 'sushi-v1',
  [Exchanges.SushiswapFantom]: 'sushi-v1',
  [Exchanges.SushiswapPolygon]: 'sushi-v1',
  [Exchanges.SushiswapBinance]: 'sushi-v1',
  [Exchanges.Pancake]: 'pancake-v2',
  [Exchanges.Quickswap]: 'quickswap-v1',
  [Exchanges.Honeyswap]: 'honey-v1',
  [Exchanges.Spookyswap]: '',
  [Exchanges.Mdexbsc]: '',
  [Exchanges.Biswap]: '',
  [Exchanges.Babyswap]: '',
  [Exchanges.Apeswap]: '',
  [Exchanges.Spiritswap]: '',
  [Exchanges.Joetrader]: '',
  [Exchanges.Pangolin]: '',
};

export interface IExchangesByNetworks {
  [key: string]: string[];
}

export const ExchangesByNetworks: IExchangesByNetworks = {
  [Networks.Ethereum]: [
    Exchanges.Uniswap,
  ],
  [Networks.Binance]: [
    Exchanges.Sushiswap,
    Exchanges.Apeswap,
    Exchanges.Babyswap,
    Exchanges.Biswap,
    Exchanges.Mdexbsc,
    Exchanges.Pancake,
    Exchanges.SushiswapBinance,
  ],
  [Networks.Polygon]: [
    Exchanges.Quickswap,
    Exchanges.SushiswapPolygon,
  ],
  [Networks.Xdai]: [
    Exchanges.Honeyswap,
    Exchanges.SushiswapXdai,
  ],
  [Networks.Fantom]: [
    Exchanges.Spiritswap,
    Exchanges.Spookyswap,
    Exchanges.SushiswapFantom,
  ],
  [Networks.Avalanche]: [
    Exchanges.Joetrader,
    Exchanges.Pangolin,
  ],
};

export const SushiswapLikeExchanges: Exchanges[] = [
  Exchanges.Sushiswap,
  Exchanges.SushiswapBinance,
  Exchanges.SushiswapFantom,
  Exchanges.SushiswapPolygon,
  Exchanges.SushiswapXdai,
];

export const isExchangeLikeSushiswap = (exchange: Exchanges) => SushiswapLikeExchanges.includes(exchange);
