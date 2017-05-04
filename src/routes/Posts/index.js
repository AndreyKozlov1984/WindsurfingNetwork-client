// @flow
import { type Store } from 'redux';
import { type Location, type RouteConfig } from '~/routes/types';
import { type State } from '~/store/state';
import { type Action } from '~/store/action';
import { injectReducer } from '~/store/reducers';
import PostsContainer from './containers/PostsContainer';
import PostContainer from './containers/PostContainer';
import { init, setData, fetchPost, default as reducer } from './modules/posts';

export default (store: Store<State, Action>): RouteConfig => ({
  path: 'posts',
  onEnter: () => injectReducer(store, { key: 'posts', reducer }),
  childRoutes: [
    {
      path: ':id',
      onEnter: (location: Location) => {
        store.dispatch(setData([]));
        store.dispatch(fetchPost(+location.params.id));
      },
      component: PostContainer,
    },
  ],
  indexRoute: {
    component: PostsContainer,
    onEnter: () => store.dispatch(init()),
  },
});

