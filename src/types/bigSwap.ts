export interface IBigSwapInfo {
  amount0In: string;
  amount0Out: string;
  amount1In: string;
  amount1Out: string;
  amountUSD: string;
  pair: {
    id: string;
    token0: { symbol: string };
    token1: { symbol: string };
  };
  timestamp: string;
  transaction: { id: string };
}
