import { Switch, Route, Redirect } from 'react-router-dom';

import { MainPage, BigSwapExplorer, LiveNewPairs, PairExplorer, BoardPage } from './pages';
import Header from './components/Header/index';
import Footer from './components/Footer/index';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/big-swap-explorer">
          <BigSwapExplorer />
        </Route>
        <Route path="/live-new-pairs/">
          <LiveNewPairs />
        </Route>
        <Route path="/pair-explorer/:id">
          <PairExplorer />
        </Route>
        <Route path="/board">
          <BoardPage />
        </Route>
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div>
  );
};
