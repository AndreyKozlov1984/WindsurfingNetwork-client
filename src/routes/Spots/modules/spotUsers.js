// @flow
import { getSpotUsers } from './api';
import { type State as GlobalState } from '~/store/state';
import { scrollToUsersBus } from '~/store/globalBus';

import cloneState from '~/store/cloneState';

export type SpotForUsers = {|
  id: number,
  name: string,
  count: number,
|};

export type User = {|
  id: number,
  logo: string,
  name: string,
  country: ?string,
  city: ?string,
  rating: number,
  photos_count: number,
|};

type SetSelectedUsersAction = {|
  type: 'spotUsers/SET_SELECTED_USERS',
  data: SpotForUsers,
|};
type SetSearchAction = {|
  type: 'spotUsers/SET_SEARCH',
  data: string,
|};

// Actions
export type Action = SetSelectedUsersAction | SetSearchAction;

type Dispatch = (action: Action | ThunkAction) => Promise<void>;
type GetState = () => GlobalState;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => Promise<void>;
export type State = {|
  isLoading: boolean,
  selectedUsers: ?SpotForUsers,
  search: string,
|};

export function loadSpotUsers (spotId: number): ThunkAction {
  return async function (dispatch: Dispatch, getState: GetState): Promise<void> {
    const result = await getSpotUsers(spotId, getState().spotUsers.search);
    dispatch(setSelectedUsers(result));
  };
}

export function changeFilters (data: string): ThunkAction {
  return async function (dispatch: Dispatch, getState: GetState): Promise<void> {
    dispatch(setSearch(data));
    const spot = getState().spotUsers.selectedUsers;
    if (spot) {
      dispatch(loadSpotUsers(spot.id));
      scrollToUsersBus.emit({});
    }
  };
}

export function setSelectedUsers (data: SpotForUsers): SetSelectedUsersAction {
  return {
    type: 'spotUsers/SET_SELECTED_USERS',
    data: data,
  };
}

export function setSearch (data: string): SetSearchAction {
  return {
    type: 'spotUsers/SET_SEARCH',
    data: data,
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const setSelectedUsersHandler = function (state: State, action: SetSelectedUsersAction): State {
  return cloneState(state, { selectedUsers: action.data });
};
const setSearchHandler = function (state: State, action: SetSearchAction): State {
  return cloneState(state, { search: action.data });
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState: State = {
  search: '',
  selectedUsers: null,
  isLoading: false,
};

export default function spotsReducer (state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'spotUsers/SET_SELECTED_USERS':
      return setSelectedUsersHandler(state, action);
    case 'spotUsers/SET_SEARCH':
      return setSearchHandler(state, action);
    default:
      (action: empty);
      return state;
  }
}

