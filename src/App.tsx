import { MainPage, BigSwapExplorer, LiveNewPairs, PairExplorer } from './pages';
import Header from './components/Header/index';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Footer from './components/Footer/index';
import Header from './components/Header/index';
import { BigSwapExplorer, Board, LiveNewPairs, MainPage } from './pages';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/board">
            <Board />
          </Route>
          <Route path="/big-swap-explorer">
            <BigSwapExplorer />
          </Route>
          <Route path="/live-new-pairs">
            <LiveNewPairs />
          </Route>
          <Route path="/pair-explorer">
            <PairExplorer />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};
