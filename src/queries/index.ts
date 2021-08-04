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
        derivedUSD
        totalSupply
        id
      }
      token1 {
        symbol
        derivedETH
        derivedUSD
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

export const GET_PAIR_SWAPS = gql`
  query getPairSwaps($id: ID!) {
    swaps(orderBy: timestamp, orderDirection: desc, where: { pair: $id }) {
      pair {
        token0 {
          symbol
        }
        token1 {
          symbol
        }
      }
      timestamp
      amount0In
      amount0Out
      amount1In
      amount1Out
      token0PriceETH
      token0PriceUSD
      token1PriceETH
      token1PriceUSD
      from
      transaction {
        id
      }
    }
  }
`;

export const GET_BIG_SWAPS = gql`
  query getBigSwaps($lowerThreshold: BigDecimal) {
    swaps(orderBy: timestamp, orderDirection: desc, where: { amountUSD_gt: $lowerThreshold }) {
      timestamp

      pair {
        reserve0
        reserve1
        id
        token0 {
          symbol
          id
        }
        token1 {
          symbol
          id
        }
      }

      amount0In
      amount0Out
      amount1In
      amount1Out

      transaction {
        id
      }

      amountUSD
    }
  }
`;

export const GET_LIVE_SWAPS = gql`
  query getLiveSwaps {
    pairs(first: 1000, orderBy: createdAtTimestamp, orderDirection: desc) {
      id
      createdAtTimestamp
      creationTxnHash
      reserve0
      reserve1
      initialReserve0
      initialReserve1
      reserveUSD
      token0 {
        id
        symbol
        derivedETH
        derivedUSD
      }
      token1 {
        id
        symbol
        derivedETH
        derivedUSD
      }
    }
  }
`;

export const ETH_PRICE_QUERY = gql`
  query ethPrice {
    bundle(id: "1") {
      ethPrice
    }
  }
`;
