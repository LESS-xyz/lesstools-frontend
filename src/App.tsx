import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { MainPage, BigSwapExplorer, LiveNewPairs, PairExplorer, BoardPage } from './pages';
import HotPairs from './components/CommonQueries/HotPairs';

import Footer from './components/Footer/index';
import Sidebar from './components/Sidebar/index';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <HotPairs />
        <Sidebar />
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/board">
            <BoardPage />
          </Route>
          <Route path="/big-swap-explorer">
            <BigSwapExplorer />
          </Route>
          <Route path="/live-new-pairs">
            <LiveNewPairs />
          </Route>
          <Route path="/pair-explorer/:id">
            <PairExplorer />
          </Route>
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};
