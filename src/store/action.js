// @flow
import { type Action as PostsAction } from '~/routes/Posts/modules/posts';
import { type Action as SpotsAction } from '~/routes/Spots/modules/spots';
export type Action = SpotsAction | PostsAction;

