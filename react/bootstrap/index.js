import App from './containers';
import Auctions from './containers/Auctions';
import EditProfile from './containers/EditProfile';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store, { history } from './stores';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import Login from './containers/Login';

const Root = () => {
  return(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Auctions}></IndexRoute>
          <Route path="/profile/edit" component={EditProfile}></Route>
          <Route path="/login" component={Login}></Route>
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;