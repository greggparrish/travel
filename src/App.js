import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom'
import {Provider} from 'mobx-react';
import {configure} from 'mobx';

import FlightView from './Pages/FlightView';
import Home from './Pages/Home';
import LocalView from './Pages/LocalView';
import SearchView from './Pages/SearchView';

import Footer from './Components/Footer';
import NavBar from './Components/NavBar';

import commonStore from './Stores/CommonStore';
import flightStore from './Stores/FlightStore';
import localStore from './Stores/LocalStore';

import './App.css';

configure({enforceActions: 'always'});
const stores = {
  commonStore,
  flightStore,
  localStore,
}

function App() {
  return (
    <Provider {...stores}>
      <Fragment>
        <NavBar />
          <div id='content-wrapper'>
            <Router>
              <Switch>
                <Route
                  store={flightStore}
                  path="/flights/:origin/:destination"
                  component={withRouter(FlightView)}
                />
                <Route
                  store={localStore}
                  path="/local/:id/:citySlug?"
                  component={withRouter(LocalView)}
                />
                <Route
                  path="/search/:query?"
                  component={withRouter(SearchView)}
                />
                <Route
                  path='/'
                  component={Home}
                />
              </Switch>
            </Router>
          </div>
        <Footer />
      </Fragment>
    </Provider>
  );
}

export default App;
