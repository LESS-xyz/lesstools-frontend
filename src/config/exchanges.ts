import uniswap from '../assets/img/sections/live-new-pairs/uniswap.svg';

export type Exchange = 'uniswap' | 'sushiswap' | 'quickswap';

export enum Exchanges {
  Uniswap = 'Uniswap',
  Sushiswap = 'Sushiswap',
  Pancake = 'Pancake',
  Quickswap = 'Quickswap',
  Honeyswap = 'Honeyswap',
  Spookyswap = 'Spookyswap',
  Mdex = 'Mdex',
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

export const ExchangesIcons: IExchangesIcons = {
  [Exchanges.Uniswap]: uniswap,
  [Exchanges.Sushiswap]: uniswap,
  [Exchanges.Pancake]: uniswap,
  [Exchanges.Quickswap]: uniswap,
  [Exchanges.Honeyswap]: uniswap,
  [Exchanges.Spookyswap]: uniswap,
  [Exchanges.Mdex]: uniswap,
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
  [Exchanges.Mdex]: '',
  [Exchanges.Biswap]: '',
  [Exchanges.Babyswap]: '',
  [Exchanges.Apeswap]: '',
  [Exchanges.Spiritswap]: '',
  [Exchanges.Joetrader]: '',
  [Exchanges.Pangolin]: '',
};
