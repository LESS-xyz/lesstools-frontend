import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import rootStore, { Provider } from './store/store';
import ScrollToTop from './utils/scrollToTop';
import CurrentExchange from './utils/currentExchange';
import { App } from './App';

import './styles/index.scss';

// uniswap (default)
export const uniswapSubgraph = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/id/QmWBu71RoJSf6LNYDTbKvUpXZH7puz9CHfGgyYq65DtMyY',
  cache: new InMemoryCache(),
});

// sushiswap
export const sushiswapSubgraph = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/rock-n-block/lesstools-sushiswap',
  cache: new InMemoryCache(),
});

// для номера блока (pair explorer page)
export const getBlockClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/sushiswap/avalanche-blocks',
  cache: new InMemoryCache(),
});

// для hot pairs (hot pairs component) -- WILL BE DELETED
export const uniswapCurrentVersion = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/rock-n-block/lesstools-uniswap-v2',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={uniswapSubgraph}>
    <Router>
      <Provider value={rootStore}>
        <CurrentExchange>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </CurrentExchange>
      </Provider>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);
