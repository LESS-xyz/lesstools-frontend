import { Redirect, Route, Switch } from 'react-router-dom';

import {
  MainPage,
  BigSwapExplorer,
  LiveNewPairs,
  PairExplorer,
  BoardPage,
  UserAccount,
} from './pages';

import HotPairs from './components/CommonQueries/HotPairs';
import Footer from './components/Footer/index';
import Sidebar from './components/Sidebar/index';

export const App: React.FC = () => {
  return (
    <div className="App">
      <HotPairs />
      <Sidebar />
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route exact path="/app">
          <BoardPage />
        </Route>
        <Route exact path={['/app/sushiswap/big-swap-explorer', '/app/uniswap/big-swap-explorer']}>
          <BigSwapExplorer />
        </Route>
        <Route exact path={['/app/sushiswap/live-new-pairs', '/app/uniswap/live-new-pairs']}>
          <LiveNewPairs />
        </Route>
        <Route path={['/app/sushiswap/pair-explorer/:id', '/app/uniswap/pair-explorer/:id']}>
          <PairExplorer />
        </Route>
        <Route path="/app/user-account">
          <UserAccount />
        </Route>
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div>
  );
};
