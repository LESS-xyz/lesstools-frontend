import { gql } from '@apollo/client';

// get pair-info-card at pair-explorer page
export const GET_PAIR_INFO = gql`
  query Pair($id: ID!) {
    base_info: pair(id: $id) {
      reserveUSD
      reserve0
      reserve1
      token0 {
        symbol
        derivedETH
        totalSupply
        id
      }
      token1 {
        symbol
        derivedETH
        totalSupply
        id
      }
      txCount
      liquidityProviderCount
      volumeUSD
      createdAtTimestamp
    }
    h24_ago_by_sum: pairHourDatas(
      first: 24
      orderBy: hourStartUnix
      orderDirection: desc
      where: { pair: $id }
    ) {
      hourlyVolumeUSD
    }
  }
`;
