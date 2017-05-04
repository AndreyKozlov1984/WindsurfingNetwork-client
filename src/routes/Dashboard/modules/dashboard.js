// @flow
import { getDashboardContent, getLookupData } from './api';
import { type State as GlobalState } from '~/store/state';
import { globalBus, FIT_BOUNDS } from '~/store/globalBus';
import _ from 'lodash';

// Exact workaround for object spread...
type Exact<T> = T & $Shape<T>;
// But Exact workaround will not allow to do a case on 'type' property

export type DashboardData = Exact<{
  mapMarkers: Array<Exact<{
      id: number,
      lat: number,
      lng: number,
    }>>,
  spots: Array<Exact<{
      id: number,
      name: string,
      country: string,
      region: ?string,
      logo: string,
      usersCount: number,
      schoolsCount: number,
      photosCount: number,
    }>>,
  activities: Array<Exact<{
      content: string,
      date: string,
      name: string,
    }>>,
}>;
export type LookupData = Exact<{
  countries: string[],
}>;
export type Filters = { [string]: any };

type UpdateUIFiltersAction = {|
  type: 'dashboard/UPDATE_UI_FILTERS',
  filterId: string,
  filterValue: any,
|};
type SetIsLoadingAction = {|
  type: 'dashboard/SET_IS_LOADING',
|};
type ClearIsLoadingAction = {|
  type: 'dashboard/CLEAR_IS_LOADING',
|};
type SetDataAction = {|
  type: 'dashboard/SET_DATA',
  data: DashboardData,
|};
type SetQueuedRequestAction = {|
  type: 'dashboard/SET_QUEUED_REQUEST',
|};
type ClearQueuedRequestAction = {|
  type: 'dashboard/CLEAR_QUEUED_REQUEST',
|};
type SetMapPositionAction = {|
  type: 'dashboard/SET_MAP_POSITION',
  center: {|
    lat: number,
    lng: number,
  |},
  zoom: number,
|};
type SetLookupDataAction = {|
  type: 'dashboard/SET_LOOKUP_DATA',
  lookupData: LookupData,
|};
type SelectSpotAction = {|
  type: 'dashboard/SELECT_SPOT',
  spotId: number,
|};
type SelectMarkerAction = {|
  type: 'dashboard/SELECT_MARKER',
  spotId: number,
|};
type SetScrollAction = {|
  type: 'dashboard/SET_SCROLL',
  offset: number,
|};

export type Action =
  | UpdateUIFiltersAction
  | SetIsLoadingAction
  | ClearIsLoadingAction
  | SetDataAction
  | SetQueuedRequestAction
  | ClearQueuedRequestAction
  | SetMapPositionAction
  | SetLookupDataAction
  | SelectSpotAction
  | SelectMarkerAction
  | SetScrollAction;

type Dispatch = (action: Action | ThunkAction) => Promise<void>;
type GetState = () => GlobalState;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => Promise<void>;

export type State = Exact<{
  isLoading: boolean,
  hasQueuedRequest: boolean,
  scrollToSelected: boolean,
  center: Exact<{
    lat: number,
    lng: number,
  }>,
  zoom: number,
  filters: Filters,
  data: ?DashboardData,
  lookupData: ?LookupData,
  selectedItemId: ?number,
  scrollPosition: number,
}>;

// ------------------------------------
// Thunk Actions
// ------------------------------------
export function setFilterState ({ filterId, filterValue }: { filterId: string, filterValue: any }): ThunkAction {
  return async function (dispatch: Dispatch, getState: GetState): Promise<void> {
    dispatch(updateUiFilters({ filterId, filterValue }));
    dispatch(reload());
    // reloadMap
  };
}

export function initOrResume (): ThunkAction {
  return async function (dispatch: Dispatch, getState: GetState): Promise<void> {
    if (!getState().dashboard.data) {
      dispatch(init());
    }
  };
}

export function init (): ThunkAction {
  return async function (dispatch: Dispatch, getState: GetState): Promise<void> {
    dispatch(loadLookup());
    dispatch(reload());
  };
}
export function loadLookup (): ThunkAction {
  return async function (dispatch: Dispatch, getState: GetState): Promise<void> {
    const data = await getLookupData();
    dispatch(setLookupData(data));
    dispatch(reload());
  };
}

export function reload (): ThunkAction {
  return async function (dispatch: Dispatch, getState: GetState): Promise<void> {
    const isLoading = () => getState().dashboard.isLoading;
    const hasQueuedRequest = () => getState().dashboard.hasQueuedRequest;
    if (!isLoading()) {
      dispatch(setIsLoading());

      const filters = getState().dashboard.filters;
      const result = await getDashboardContent(filters);

      dispatch(clearIsLoading());
      dispatch(setData(result));
      globalBus.emit(FIT_BOUNDS);

      if (hasQueuedRequest()) {
        dispatch(clearQueuedRequest());
        dispatch(reload());
      }
    } else {
      dispatch(setQueuedRequest());
    }
  };
}

// --------------
// Normal Actions
// --------------

export function setLookupData (lookupData: LookupData): SetLookupDataAction {
  return {
    type: 'dashboard/SET_LOOKUP_DATA',
    lookupData: lookupData,
  };
}

export function clearQueuedRequest (): ClearQueuedRequestAction {
  return {
    type: 'dashboard/CLEAR_QUEUED_REQUEST',
  };
}

export function setQueuedRequest (): SetQueuedRequestAction {
  return {
    type: 'dashboard/SET_QUEUED_REQUEST',
  };
}

export function updateUiFilters ({
  filterId,
  filterValue,
}: { filterId: string, filterValue: any }): UpdateUIFiltersAction {
  return {
    type: 'dashboard/UPDATE_UI_FILTERS',
    filterId,
    filterValue,
  };
}

export function selectSpot (spotId: number): SelectSpotAction {
  return {
    type: 'dashboard/SELECT_SPOT',
    spotId: spotId,
  };
}

export function selectMarker (spotId: number): SelectMarkerAction {
  return {
    type: 'dashboard/SELECT_MARKER',
    spotId: spotId,
  };
}

export function setScroll (offset: number): SetScrollAction {
  return {
    type: 'dashboard/SET_SCROLL',
    offset: offset,
  };
}

export function setIsLoading (): SetIsLoadingAction {
  return {
    type: 'dashboard/SET_IS_LOADING',
  };
}

export function clearIsLoading (): ClearIsLoadingAction {
  return {
    type: 'dashboard/CLEAR_IS_LOADING',
  };
}

export function setData (data: DashboardData): SetDataAction {
  return {
    type: 'dashboard/SET_DATA',
    data: data,
  };
}

export function setMapPosition ({
  center,
  zoom,
}: { center: {| lat: number, lng: number |}, zoom: number }): SetMapPositionAction {
  return {
    type: 'dashboard/SET_MAP_POSITION',
    center,
    zoom,
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const updateUIFiltersHandler = function (state: State, action: UpdateUIFiltersAction): State {
  return {
    ...state,
    filters: {
      ...state.filters,
      [action.filterId]: action.filterValue,
    },
  };
};
const setIsLoadingHandler = function (state: State, action: SetIsLoadingAction): State {
  return { ...state, isLoading: true };
};
const clearIsLoadingHandler = function (state: State, action: ClearIsLoadingAction): State {
  return { ...state, isLoading: false };
};
const setQueuedRequestHandler = function (state: State, action: SetQueuedRequestAction): State {
  return { ...state, hasQueuedRequest: true };
};
const clearQueuedRequestHandler = function (state: State, action: ClearQueuedRequestAction): State {
  return { ...state, hasQueuedRequest: false };
};
const setDataHandler = function (state: State, action: SetDataAction) {
  return {
    ...state,
    data: action.data,
  };
};
const setMapPositionHandler = function (state: State, action: SetMapPositionAction): State {
  return {
    ...state,
    center: action.center,
    zoom: action.zoom,
  };
};
const setLookupDataHandler = function (state: State, action: SetLookupDataAction) {
  return {
    ...state,
    lookupData: action.lookupData,
  };
};
const selectSpotHandler = function (state: State, action: SelectSpotAction) {
  if (!state.data) {
    return state;
  }
  const selectedItem = _.find(state.data.mapMarkers, { id: action.spotId });
  if (selectedItem) {
    return {
      ...state,
      center: {
        lat: selectedItem.lat,
        lng: selectedItem.lng,
      },
      zoom: state.zoom < 12 ? 12 : state.zoom,
      selectedItemId: action.spotId,
    };
  } else {
    return {
      ...state,
      selectedItemId: null,
    };
  }
};
const selectMarkerHandler = function (state: State, action: SelectMarkerAction): State {
  if (!state.data) {
    return state;
  }
  const selectedItem = _.find(state.data.mapMarkers, { id: action.spotId });
  if (selectedItem) {
    return {
      ...state,
      selectedItemId: action.spotId,
      scrollToSelected: true,
    };
  } else {
    return {
      ...state,
      selectedItemId: null,
    };
  }
};
const setScrollHandler = function (state: State, action: SetScrollAction) {
  return {
    ...state,
    scrollPosition: action.offset,
    scrollToSelected: false,
  };
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState: State = {
  data: null,
  lookupData: null,
  isLoading: false,
  hasQueuedRequest: false,
  center: { lat: 23.34, lng: 34.45 },
  zoom: 3,
  filters: {},
  selectedItemId: null,
  scrollToSelected: false,
  scrollPosition: 0,
};

export default function dashboardReducer (state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'dashboard/UPDATE_UI_FILTERS':
      return updateUIFiltersHandler(state, action);
    case 'dashboard/SET_IS_LOADING':
      return setIsLoadingHandler(state, action);
    case 'dashboard/CLEAR_IS_LOADING':
      return clearIsLoadingHandler(state, action);
    case 'dashboard/SET_QUEUED_REQUEST':
      return setQueuedRequestHandler(state, action);
    case 'dashboard/CLEAR_QUEUED_REQUEST':
      return clearQueuedRequestHandler(state, action);
    case 'dashboard/SET_DATA':
      return setDataHandler(state, action);
    case 'dashboard/SET_MAP_POSITION':
      return setMapPositionHandler(state, action);
    case 'dashboard/SET_LOOKUP_DATA':
      return setLookupDataHandler(state, action);
    case 'dashboard/SELECT_SPOT':
      return selectSpotHandler(state, action);
    case 'dashboard/SELECT_MARKER':
      return selectMarkerHandler(state, action);
    case 'dashboard/SET_SCROLL':
      return setScrollHandler(state, action);
    default:
      (action: empty);
      return state;
  }
}

