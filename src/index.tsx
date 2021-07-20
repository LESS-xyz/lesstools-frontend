import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import rootStore, { Provider } from './store/store';
import { App } from './App';

import './styles/index.scss';

const client = new ApolloClient({
  uri: 'https://thegraph.com/legacy-explorer/subgraph/uniswap/uniswap-v2?selected=playground',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider value={rootStore}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);
