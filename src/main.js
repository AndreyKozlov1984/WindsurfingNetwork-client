import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import AppContainer from './containers/AppContainer';
import { configure } from 'redux-auth';

// Perf! making it available in the dev tools
import Perf from 'react-addons-perf';
window.Perf = Perf; // eslint-disable-line immutable/no-mutation

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.__INITIAL_STATE__;
const store = createStore(initialState);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

const render = async () => {
  const routes = require('./routes/index').default(store);
  await store.dispatch(
    configure(
      {
        apiUrl: `/api`,
      },
      {
        cleanSession: false,
        clientOnly: true,
        storage: 'localStorage',
      },
    ),
  );
  ReactDOM.render(<AppContainer store={store} routes={routes} />, MOUNT_NODE);
};

const hotReloadedRender = () => {
  const renderApp = render;
  const renderError = error => {
    const RedBox = require('redbox-react').default;

    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
  };

  // Wrap render in try/catch
  try {
    renderApp();
  } catch (error) {
    console.error(error);
    renderError(error);
  }
};

// This code is excluded from production bundle
if (__DEV__ && module.hot) {
  // Development render functions
  // Setup hot module replacement
  module.hot.accept('./routes/index', () =>
    setImmediate(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    }),
  );
  hotReloadedRender();
} else {
  render();
}

