import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import rootStore, { Provider } from './store/store';
import ScrollToTop from './utils/scrollToTop';
import { App } from './App';

import './styles/index.scss';

const client = new ApolloClient({
  // uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
  // uri: 'https://api.thegraph.com/subgraphs/name/rock-n-block/lesstools-uniswap-v2',
  uri: 'https://api.thegraph.com/subgraphs/id/QmWBu71RoJSf6LNYDTbKvUpXZH7puz9CHfGgyYq65DtMyY',
  cache: new InMemoryCache(),
});

// для номера блока (pair explorer page)
export const getBlockClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/sushiswap/avalanche-blocks',
  cache: new InMemoryCache(),
});

// для hot pairs (hot pairs component)
export const uniswapCurrentVersion = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/rock-n-block/lesstools-uniswap-v2',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Provider value={rootStore}>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </Provider>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);
