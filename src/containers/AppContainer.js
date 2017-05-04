// @flow
import React, { Component } from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { type Store } from 'redux';
import { type State } from '~/store/state';
import { type Action } from '~/store/action';
import { type RouteConfig } from '~/routes/types';

class AppContainer extends Component {
  props: {
    routes: RouteConfig,
    store: Store<State, Action>,
  };

  shouldComponentUpdate () {
    return false;
  }

  render () {
    const { routes, store } = this.props;
    const history = syncHistoryWithStore(browserHistory, store);

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={history} children={routes} />
        </div>
      </Provider>
    );
  }
}

export default AppContainer;

