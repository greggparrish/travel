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

import flightStore from './Stores/FlightStore';
import cityStore from './Stores/CityStore';

import './App.css';

configure({enforceActions: 'always'});
const stores = {
  cityStore,
  flightStore
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
                  path="/flights/:origin/:destination"
                  component={withRouter(FlightView)}
                />
                <Route
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
