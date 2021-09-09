export interface IGasPrice {
  fastest: number;
  fast: number;
  average: number;
  safeLow: number;
}

export async function getGasPrice(): Promise<IGasPrice> {
  try {
    const res = await fetch('https://gas.api.0x.org/source/median?output=eth_gas_station');
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
