import { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useMst } from './store/store';
import { BigSwapExplorer, LiveNewPairs, PairExplorer, BoardPage, UserAccount } from './pages';

import HotPairs from './components/CommonQueries/HotPairs';
import Footer from './components/Footer/index';
import Sidebar from './components/Sidebar/index';
import InfoBlock from './components/InfoBlock';
import MobileHeader from './components/MobileHeader';

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
      <MobileHeader />
      <Sidebar />
      <Route path={['/sushiswap', '/uniswap']}>
        <InfoBlock />
      </Route>

      <Switch>
        <Route exact path="/">
          <BoardPage />
        </Route>
        <Route exact path={['/sushiswap/big-swap-explorer', '/uniswap/big-swap-explorer']}>
          <BigSwapExplorer />
        </Route>
        <Route exact path={['/sushiswap/live-new-pairs', '/uniswap/live-new-pairs']}>
          <LiveNewPairs />
        </Route>
        <Route path={[
          // '/sushiswap/pair-explorer/:id',
          // '/uniswap/pair-explorer/:id',
          // '/quickswap/pair-explorer/:id',
          '/ethereum/pair-explorer/:id',
          '/binance/pair-explorer/:id',
          '/polygon/pair-explorer/:id',
        ]}>
          <PairExplorer />
        </Route>
        <Route path="/user-account">
          <UserAccount />
        </Route>
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div>
  );
});
