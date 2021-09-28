import uniswap from '../assets/img/sections/live-new-pairs/uniswap.svg';

export enum Exchanges {
  Uniswap = 'Uniswap',
  Sushiswap = 'Sushiswap',
  Pancake = 'Pancake',
  Quickswap = 'Quickswap',
}

export interface IExchangesIcons {
  [key: string]: string
}

export const ExchangesIcons: IExchangesIcons = {
  [Exchanges.Uniswap]: uniswap,
  [Exchanges.Sushiswap]: uniswap,
  [Exchanges.Pancake]: uniswap,
  [Exchanges.Quickswap]: uniswap,
}
