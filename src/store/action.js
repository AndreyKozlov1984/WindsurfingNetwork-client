// @flow
import { type Action as PostsAction } from '~/routes/Posts/modules/posts';
import { type Action as SpotsAction } from '~/routes/Spots/modules/spots';
import { type Action as DashboardAction } from '~/routes/Dashboard/modules/dashboard';
export type Action = SpotsAction | PostsAction | DashboardAction;

