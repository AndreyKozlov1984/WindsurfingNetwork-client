// @flow
import { getPosts, getPost } from './api';
import { type State as GlobalState } from '~/store/state';
import cloneState from '~/store/cloneState';

export type Comment = {|
  id: number,
  user_id: number,
  date: string,
  logo: string,
  content: string,
  name: string,
|};
export type Post = {|
  id: number,
  comments: Array<Comment>,
  content: string,
  date: string,
  image_filename: ?string,
  logo: string,
  name: string,
|};
type SetDataAction = {|
  type: 'posts/SET_DATA',
  data: Array<Post>,
|};
type SetSelectedAction = {|
  type: 'posts/SET_SELECTED',
  data: Post,
|};
export type Action = SetDataAction | SetSelectedAction;
type Dispatch = (action: Action | ThunkAction) => Promise<void>;
type GetState = () => GlobalState;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => Promise<void>;
export type State = {|
  isLoading: boolean,
  data: ?Array<Post>,
  selectedPost: ?Post,
|};

// Actions
export function init (): ThunkAction {
  return async function (dispatch: Dispatch, getState: GetState): Promise<void> {
    dispatch(reload());
  };
}

export function fetchPost (id: number): ThunkAction {
  return async function (dispatch: Dispatch, getState: GetState): Promise<void> {
    const result = await getPost(id);
    dispatch(setSelected(result));
  };
}

export function setSelected (data: Post): SetSelectedAction {
  return {
    type: 'posts/SET_SELECTED',
    data: data,
  };
}

export function reload (): ThunkAction {
  return async function (dispatch: Dispatch, getState: GetState): Promise<void> {
    const result = await getPosts();
    dispatch(setData(result));
  };
}

export function setData (data: Array<Post>): SetDataAction {
  return {
    type: 'posts/SET_DATA',
    data: data,
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const SetDataHandler = function (state: State, action: SetDataAction): State {
  return cloneState(state, {
    data: action.data,
  });
};
const SetSelectedHandler = function (state: State, action: SetSelectedAction): State {
  return cloneState(state, {
    selectedPost: action.data,
  });
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState: State = {
  isLoading: false,
  data: null,
  selectedPost: null,
};

export default function postsReducer (state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'posts/SET_DATA':
      return SetDataHandler(state, action);
    case 'posts/SET_SELECTED':
      return SetSelectedHandler(state, action);
    default:
      (action: empty);
      return state;
  }
}

