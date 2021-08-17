import { gql } from '@apollo/client';

// get pair-info-card at pair-explorer page UNISWAP
export const GET_PAIR_INFO = gql`
  query Pair($id: ID!, $blockNumber: Int) {
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
    tokens_prices_24h_ago: pair(block: { number: $blockNumber }, id: $id) {
      token0 {
        derivedETH
        derivedUSD
      }
      token1 {
        derivedETH
        derivedUSD
      }
    }
  }
`;

export const GET_PAIR_INFO_SUSHIWAP = gql`
  query Pair($id: ID!, $blockNumber: Int) {
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
      createdAtTimestamp: timestamp
    }
    h24_ago_by_sum: pairHourDatas(
      first: 24
      orderBy: date
      orderDirection: desc
      where: { pair: $id }
    ) {
      hourlyVolumeUSD: volumeUSD
    }
    tokens_prices_24h_ago: pair(block: { number: $blockNumber }, id: $id) {
      token0 {
        derivedETH
        derivedUSD
      }
      token1 {
        derivedETH
        derivedUSD
      }
    }
  }
`;

// GET BLOCK NUMBER 24h AGO
export const GET_BLOCK_24H_AGO = gql`
  query blocks($timestamp: BigInt!) {
    blocks(
      first: 1
      orderBy: timestamp
      orderDirection: asc
      where: { timestamp_gte: $timestamp }
    ) {
      id
      number
    }
  }
`;

// GET all pair swaps for table at pair explorer page
export const GET_PAIR_SWAPS = gql`
  query getPairSwaps($id: ID!) {
    swaps(orderBy: timestamp, orderDirection: desc, where: { pair: $id }) {
      pair {
        token0 {
          symbol
          id
        }
        token1 {
          symbol
          id
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

// big swaps table (sushiswap and uniswap)
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

// live new pairs table
export const GET_LIVE_SWAPS = gql`
  query getLiveSwaps {
    pairs(first: 100, orderBy: createdAtTimestamp, orderDirection: desc) {
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

// live new pairs table SUSHISWAP
export const GET_LIVE_SWAPS_SUSHISWAP = gql`
  query getLiveSwaps {
    pairs(first: 100, orderBy: timestamp, orderDirection: desc) {
      id
      createdAtTimestamp: timestamp
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

// ETH price now
export const ETH_PRICE_QUERY = gql`
  query ethPrice {
    bundle(id: "1") {
      ethPrice
    }
  }
`;

// SEARCHING QUERIES
// SEARCH BY PAIR ID OR TOKEN ID
export const SEARCH_BY_ID = gql`
  query getPairByPairId($id: ID) {
    match_by_pair: pairs(where: { id_gte: $id }, first: 3) {
      id
      txCount
      token0 {
        id
        symbol
        name
      }
      token1 {
        id
        symbol
        name
      }
    }
    match_by_token: tokens(where: { id_gte: $id }, first: 3) {
      id
      pairBase {
        id
        txCount
        token0 {
          id
          symbol
          name
        }
        token1 {
          id
          symbol
          name
        }
      }
    }
  }
`;

// SEARCH BY TOKEN NAME
export const SEARCH_BY_NAME = gql`
  query searchByName($name: String, $name2: String) {
    match_by_symbol: tokens(where: { symbol_contains: $name }) {
      id
      symbol
      pairBase {
        id
        txCount
        token0 {
          symbol
          name
          id
        }
        token1 {
          symbol
          name
          id
        }
      }
      pairQuote {
        id
        txCount
        token0 {
          symbol
          name
          id
        }
        token1 {
          symbol
          name
          id
        }
      }
    }
    match_by_symbol1: tokens(where: { symbol_contains: $name2 }, first: 1) {
      id
    }
  }
`;

// hot pairs UNISWAP
export const GET_HOT_PAIRS = gql`
  query getHotPairs($timestamp1: Int, $timestamp2: Int, $timestamp3: Int) {
    currentHour: pairHourDatas(
      orderBy: hourlyTxns
      orderDirection: desc
      where: { hourStartUnix: $timestamp1 }
    ) {
      pair {
        id
        token0 {
          symbol
          id
          derivedUSD
        }
        token1 {
          symbol
          id
          derivedUSD
        }
      }
      hourlyTxns
    }

    oneHour: pairHourDatas(
      orderBy: hourlyTxns
      orderDirection: desc
      where: { hourStartUnix: $timestamp2 }
    ) {
      pair {
        id
        token0 {
          symbol
          id
          derivedUSD
        }
        token1 {
          symbol
          id
          derivedUSD
        }
      }
      hourlyTxns
    }

    twoHours: pairHourDatas(
      orderBy: hourlyTxns
      orderDirection: desc
      where: { hourStartUnix: $timestamp3 }
    ) {
      pair {
        id
        token0 {
          symbol
          id
          derivedUSD
        }
        token1 {
          symbol
          id
          derivedUSD
        }
      }
      hourlyTxns
    }
  }
`;

export const GET_HOT_PAIRS_SUSHISWAP = gql`
  query getHotPairs($timestamp1: Int, $timestamp2: Int, $timestamp3: Int) {
    currentHour: pairHourDatas(
      orderBy: txCount
      orderDirection: desc
      where: { date: $timestamp1 }
    ) {
      pair {
        id
        token0 {
          symbol
          id
          derivedUSD
        }
        token1 {
          symbol
          id
          derivedUSD
        }
      }
      hourlyTxns: txCount
    }

    oneHour: pairHourDatas(orderBy: txCount, orderDirection: desc, where: { date: $timestamp2 }) {
      pair {
        id
        token0 {
          symbol
          id
          derivedUSD
        }
        token1 {
          symbol
          id
          derivedUSD
        }
      }
      hourlyTxns: txCount
    }

    twoHours: pairHourDatas(orderBy: txCount, orderDirection: desc, where: { date: $timestamp3 }) {
      pair {
        id
        token0 {
          symbol
          id
          derivedUSD
        }
        token1 {
          symbol
          id
          derivedUSD
        }
      }
      hourlyTxns: txCount
    }
  }
`;
