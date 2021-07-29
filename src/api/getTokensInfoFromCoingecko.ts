export interface IToken {
  address: string;
  chainId: number;
  decimals: number;
  logoURI: string;
  name: string;
  symbol: string;
}

/**
 * Function description
 *
 * @param {String} adress - token adress
 * @description fetch tokens-list from coingecko
 * @returns returns Promise with token info for passed adress
 * @example getTokenInfoFromCoingecko("0xbb2b8038a1640196fbe3e38816f3e67cba72d940").then(res => console.log(res));
 * {
 * adress: "0xbb2b8038a1640196fbe3e38816f3e67cba72d940";
 * chainId: 2;
 * decimals: 18;
 * logoURI: "https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1547036627";
 * name: "Wrapped Etherium";
 * symbol: "WETH";
 * }
 */

export async function getTokenInfoFromCoingecko(adress: string): Promise<IToken | undefined> {
  const res: any = await fetch('https://tokens.coingecko.com/uniswap/all.json');
  const json: any = await res.json();
  const data: Array<IToken> = json.tokens;
  return new Promise((resolve) => {
    resolve(data.find((token: IToken) => token.address === adress));
  });
}
