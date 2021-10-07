import ethereum from "../assets/img/sections/sidebar/networks/ethereum.svg";
import binance from "../assets/img/sections/sidebar/networks/binance.svg";
import polygon from "../assets/img/sections/sidebar/networks/polygon.svg";
import avalanche from "../assets/img/sections/sidebar/networks/avalanche.svg";
import fantom from "../assets/img/sections/sidebar/networks/fantom.svg";
import xdai from "../assets/img/sections/sidebar/networks/xdai.svg";

export enum Networks {
  Ethereum = 'Ethereum',
  Binance = 'Binance',
  Polygon = 'Polygon',
  Xdai = 'Xdai',
  Avalanche = 'Avalanche',
  Fantom = 'Fantom',
}

export const NetworksForSidebar = {
  [Networks.Ethereum]: 'Ethereum',
  [Networks.Binance]: 'BSC',
  [Networks.Polygon]: 'Polygon',
  [Networks.Xdai]: 'Xdai',
  [Networks.Avalanche]: 'Avalanche',
  [Networks.Fantom]: 'Fantom',
}

export const NetworksForTools = {
  [Networks.Ethereum]: 'ETH',
  [Networks.Binance]: 'BSC',
  [Networks.Polygon]: 'Polygon',
  [Networks.Xdai]: 'Xdai',
  [Networks.Avalanche]: 'Avalanche',
  [Networks.Fantom]: 'Fantom',
}

export const NetworksForHotTable = {
  [Networks.Ethereum]: 'ETH',
  [Networks.Binance]: 'BSC',
  [Networks.Polygon]: 'Polygon',
  [Networks.Xdai]: 'Xdai',
  [Networks.Avalanche]: 'Avalanche',
  [Networks.Fantom]: 'Fantom',
}

export const NetworksIcons: { [key: string]: string } = {
  [Networks.Ethereum]: ethereum,
  [Networks.Binance]: binance,
  [Networks.Polygon]: polygon,
  [Networks.Xdai]: xdai,
  [Networks.Avalanche]: avalanche,
  [Networks.Fantom]: fantom,
}

export const DefaultPairsByNetwork: { [key: string]: string } = {
  [Networks.Ethereum]: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
  [Networks.Binance]: '0xe06f8d30ac334c857fc8c380c85969c150f38a6a',
  [Networks.Polygon]: '0x0024739eb63fb6697e63698c93c77b9508f15ab2',
  [Networks.Xdai]: '0x0024739eb63fb6697e63698c93c77b9508f15ab2',
  [Networks.Avalanche]: '0x0024739eb63fb6697e63698c93c77b9508f15ab2',
  [Networks.Fantom]: '0x0024739eb63fb6697e63698c93c77b9508f15ab2',
}
