import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import rootStore, { Provider } from './store/store';
import { App } from './App';

import './styles/index.scss';

ReactDOM.render(
  <Provider value={rootStore}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
