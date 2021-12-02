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
  [Networks.Binance]: '0x489c8ff79245f14aeee9520d28209844790cb979',
  [Networks.Polygon]: '0x0024739eb63fb6697e63698c93c77b9508f15ab2',
  [Networks.Xdai]: '0xc704050a17af0caed763431b80e38e8d8ff15591',
  [Networks.Avalanche]: '0xf64e1c5b6e17031f5504481ac8145f4c3eab4917',
  [Networks.Fantom]: '0x31c0385dde956f95d43dac80bd74fee149961f4c',
}
