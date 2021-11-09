const IS_PRODUCTION = false;
const IS_PREPRODUCTION = true;

export default {
  APIS: {
    // eslint-disable-next-line no-nested-ternary
    backend: IS_PRODUCTION
      ? ''
      : IS_PREPRODUCTION
      ? 'https://tools.less.xyz/api/v1/'
      : 'https://lesstools.rocknblock.io/api/v1/',
    COINGECKO: 'https://api.coingecko.com/api/v3',
    // backend: 'https://tools.less.xyz/api/v1/',
    THE_GRAPH: 'https://api.thegraph.com/subgraphs',
  },
  WALLET_TO_PAY: '0x5a4B4454EDC88325FA1f88A8D9016E8b6eB3BEC5',
};
