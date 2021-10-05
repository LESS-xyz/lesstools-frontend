import uniswap from '../assets/img/sections/live-new-pairs/uniswap.svg';
import ethereum from '../assets/img/icons/eth-logo.svg';
import { Networks } from "./networks";

// todo: remove (used in mobx)
export type Exchange = 'uniswap' | 'sushiswap' | 'quickswap' | 'ethereum';

export enum Exchanges {
  Uniswap = 'Uniswap',
  Sushiswap = 'Sushiswap',
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
    Exchanges.Sushiswap,
  ],
  [Networks.Polygon]: [
    Exchanges.Quickswap,
    Exchanges.Sushiswap,
  ],
  [Networks.Xdai]: [
    Exchanges.Honeyswap,
    Exchanges.Sushiswap,
  ],
  [Networks.Fantom]: [
    Exchanges.Spiritswap,
    Exchanges.Spookyswap,
    Exchanges.Sushiswap,
  ],
  [Networks.Avalanche]: [
    Exchanges.Joetrader,
    Exchanges.Pangolin,
  ],
};
