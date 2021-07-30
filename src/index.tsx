import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import rootStore, { Provider } from './store/store';
import ScrollToTop from './utils/scrollToTop';
import { App } from './App';

import './styles/index.scss';

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
  // uri: 'https://api.thegraph.com/subgraphs/name/rock-n-block/lesstools-uniswap-v2',
  // uri: 'https://api.thegraph.com/subgraphs/id/QmUsrEkfZvtsRR5bBfknYd7fJZKMVVEbMV7oZrFzae4m3o',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider value={rootStore}>
      <Router>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);
