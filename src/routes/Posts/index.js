import { injectReducer } from '~/store/reducers';
import PostsContainer from './containers/PostsContainer';
import PostContainer from './containers/PostContainer';
import { init, fetchPost, default as reducer } from './modules/posts';

export default store => ({
  path: 'posts',
  onEnter: () => injectReducer(store, { key: 'posts', reducer }),
  childRoutes: [
    {
      path: ':id',
      onEnter: location => store.dispatch(fetchPost(location.params.id)),
      component: PostContainer,
    },
  ],
  indexRoute: {
    component: PostsContainer,
    onEnter: () => store.dispatch(init()),
  },
});

