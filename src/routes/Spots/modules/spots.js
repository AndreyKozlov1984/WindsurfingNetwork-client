// @flow
import { getSpot, getSpotGallery, getSpotUsers } from './api';
import { type State as GlobalState } from '~/store/state';

import cloneState from '~/store/cloneState';

export type Spot = {|
  lat: number,
  lng: number,
  id: number,
  logo: string,
  name: string,
  country: string,
  region: string,
  rating: number,
  monthly_distribution: { [string]: number[] },
  photos: Array<string>,
  users: Array<SimpleUser>,
  schools: Array<SimpleSchool>,
|};

export type SimpleUser = {|
  id: number,
  logo: string,
|};
export type SimpleSchool = {|
  id: number,
  logo: string,
  name: string,
|};

export type SpotForUsers = {|
  id: number,
  name: string,
  users: User[],
|};

export type Photo = {|
  width: number,
  height: number,
  photo: string,
|};
export type PhotosByMonth = { [number]: Photo[] };

export type SpotForGallery = {|
  id: number,
  name: string,
  photos: PhotosByMonth,
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

export type School = {|
  id: number,
  logo: string,
  name: string,
|};

type SetSelectedAction = {|
  type: 'spots/SET_SELECTED',
  data: Spot,
|};

type SetSelectedGalleryAction = {|
  type: 'spots/SET_SELECTED_GALLERY',
  data: SpotForGallery,
|};

type SetSelectedUsersAction = {|
  type: 'spots/SET_SELECTED_USERS',
  data: SpotForUsers,
|};

type SelectMonthAction = {|
  type: 'spots/SELECT_MONTH',
  month: ?number,
|};

// Actions
export type Action = SetSelectedAction | SetSelectedGalleryAction | SetSelectedUsersAction | SelectMonthAction;
type Dispatch = (action: Action | ThunkAction) => Promise<void>;
type GetState = () => GlobalState;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => Promise<void>;
export type State = {|
  isLoading: boolean,
  selectedSpot: ?Spot,
  selectedGallery: ?SpotForGallery,
  selectedMonth: ?number,
  selectedUsers: ?SpotForUsers,
|};

export function loadGallery ({ spotId, selectedMonth }: { spotId: number, selectedMonth: ?number }): ThunkAction {
  return async function (dispatch: Dispatch, getState: GetState): Promise<void> {
    if (spotId !== (getState().spots.selectedGallery || {}).id) {
      await dispatch(fetchSpotGallery(spotId));
    }
    dispatch(selectMonth(selectedMonth));
  };
}

export function loadSpotUsers (spotId: number): ThunkAction {
  return async function (dispatch: Dispatch, getState: GetState): Promise<void> {
    const result = await getSpotUsers(spotId);
    dispatch(setSelectedUsers(result));
  };
}

export function fetchSpot (id: number): ThunkAction {
  return async function (dispatch: Dispatch, getState: GetState): Promise<void> {
    const result = await getSpot(id);
    dispatch(setSelected(result));
  };
}

export function fetchSpotGallery (id: number): ThunkAction {
  return async function (dispatch: Dispatch, getState: GetState): Promise<void> {
    const result = await getSpotGallery(id);
    dispatch(setSelectedGallery(result));
  };
}

export function setSelected (data: Spot): SetSelectedAction {
  return {
    type: 'spots/SET_SELECTED',
    data: data,
  };
}

export function setSelectedUsers (data: SpotForUsers): SetSelectedUsersAction {
  return {
    type: 'spots/SET_SELECTED_USERS',
    data: data,
  };
}

export function selectMonth (month: ?number): SelectMonthAction {
  return {
    type: 'spots/SELECT_MONTH',
    month: month,
  };
}

export function setSelectedGallery (data: SpotForGallery): SetSelectedGalleryAction {
  return {
    type: 'spots/SET_SELECTED_GALLERY',
    data: data,
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const setSelectedHandler = function (state: State, action: SetSelectedAction): State {
  return cloneState(state, { selectedSpot: action.data });
};
const setSelectedGalleryHandler = function (state: State, action: SetSelectedGalleryAction): State {
  return cloneState(state, { selectedGallery: action.data });
};
const setSelectedUsersHandler = function (state: State, action: SetSelectedUsersAction): State {
  return cloneState(state, { selectedUsers: action.data });
};
const selectMonthHandler = function (state: State, action: SelectMonthAction): State {
  return cloneState(state, { selectedMonth: action.month });
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState: State = {
  isLoading: false,
  selectedSpot: null,
  selectedGallery: null,
  selectedMonth: null,
  selectedUsers: null,
};

export default function spotsReducer (state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'spots/SET_SELECTED':
      return setSelectedHandler(state, action);
    case 'spots/SET_SELECTED_GALLERY':
      return setSelectedGalleryHandler(state, action);
    case 'spots/SET_SELECTED_USERS':
      return setSelectedUsersHandler(state, action);
    case 'spots/SELECT_MONTH':
      return selectMonthHandler(state, action);
    default:
      (action: empty);
      return state;
  }
}

