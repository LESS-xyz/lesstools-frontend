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

export interface INetworksIcons {
  [key: string]: string
}

export const NetworksIcons: INetworksIcons = {
  [Networks.Ethereum]: ethereum,
  [Networks.Binance]: binance,
  [Networks.Polygon]: polygon,
  [Networks.Xdai]: xdai,
  [Networks.Avalanche]: avalanche,
  [Networks.Fantom]: fantom,
}
