import { Redirect, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useMst } from './store/store';
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
import InfoBlock from './components/InfoBlock';
import MobileHeader from './components/MobileHeader';
import { useEffect } from 'react';

export const App: React.FC = observer(() => {
  const { mobileMenu } = useMst();
  useEffect(() => {
    const body = document.querySelector('body');
    if (mobileMenu.isActive) body?.classList.add('fixed');
    else body?.classList.remove('fixed');
  }, [mobileMenu.isActive]);
  return (
    <div className="App">
      <HotPairs />
      <Route path="/app">
        <MobileHeader />
        <InfoBlock />
        <Sidebar />
      </Route>
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
});
