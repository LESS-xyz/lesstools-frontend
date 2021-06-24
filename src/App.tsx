import { MainPage } from './pages';
import Header from './components/Header/index';
import Footer from './components/Footer/index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};
