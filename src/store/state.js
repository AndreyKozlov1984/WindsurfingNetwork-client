// @flow
import { type State as PostsState } from '~/routes/Posts/modules/posts';
import { type State as SpotsState } from '~/routes/Spots/modules/spots';
import { type State as SpotEditState } from '~/routes/Spots/modules/spotEdit';
import { type State as DashboardState } from '~/routes/Dashboard/modules/dashboard';

export type AuthUserState = {
  isSignedIn: boolean,
  attributes: ?{
    uid: string,
    provider: string,
    email: string,
    role: 'admin' | 'user',
  },
};

export type State = {
  dashboard: DashboardState,
  posts: PostsState,
  spots: SpotsState,
  spotEdit: SpotEditState,
  auth: { get: (key: 'user') => { toJS: () => AuthUserState } }, // wrapper for immutable
};

