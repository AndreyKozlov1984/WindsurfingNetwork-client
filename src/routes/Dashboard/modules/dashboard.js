// @flow
import { getDashboardContent, getLookupData } from './api';
import { type State as GlobalState } from '~/store/state';
import { fitBoundsBus, scrollToSpotBus } from '~/store/globalBus';
import cloneState from '~/store/cloneState';
import _ from 'lodash-es';

export type MapMarker = {|
  id: number,
  lat: number,
  lng: number,
  index: number,
|};
export type Spot = {|
  id: number,
  name: string,
  country: string,
  region: ?string,
  logo: string,
  users_count: number,
  schools_count: number,
  photos_count: number,
|};
export type Activity = {|
  id: number,
  content: string,
  date: string,
  name: string,
|};
export type DashboardData = {|
  mapMarkers: MapMarker[],
  spots: { count: number },
|};
export type LookupData = {|
  countries: string[],
|};
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
  | SelectMarkerAction;

type Dispatch = (action: Action | ThunkAction) => Promise<void>;
type GetState = () => GlobalState;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => Promise<void>;

export type State = {|
  isLoading: boolean,
  hasQueuedRequest: boolean,
  center: {|
    lat: number,
    lng: number,
  |},
  zoom: number,
  filters: Filters,
  data: ?DashboardData,
  lookupData: ?LookupData,
  selectedItemId: ?number,
|};

// ------------------------------------
// Thunk Actions
// ------------------------------------
export function setFilterState ({ filterId, filterValue }: {| filterId: string, filterValue: any |}): ThunkAction {
  return async function (dispatch: Dispatch, getState: GetState): Promise<void> {
    dispatch(updateUiFilters({ filterId, filterValue }));
    dispatch(reload());
    // reloadMap
    scrollToSpotBus.emit({ index: 0 });
  };
}

export function initOrResume (): ThunkAction {
  return async function (dispatch: Dispatch, getState: GetState): Promise<void> {
    if (!getState().dashboard.data) {
      dispatch(init());
    } else {
      dispatch(reload());
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
      fitBoundsBus.emit({});

      if (hasQueuedRequest()) {
        dispatch(clearQueuedRequest());
        dispatch(reload());
      }
    } else {
      dispatch(setQueuedRequest());
    }
  };
}

export function selectMarker (spotId: number): ThunkAction {
  return async function (dispatch: Dispatch, getState: GetState): Promise<void> {
    dispatch({
      type: 'dashboard/SELECT_MARKER',
      spotId: spotId,
    });
    const data = getState().dashboard.data;
    if (!data) {
      return;
    }
    const spotIndex = _.findIndex(data.mapMarkers, { id: spotId });
    scrollToSpotBus.emit({ index: spotIndex });
    console.info(spotIndex);
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
  return cloneState(state, {
    filters: cloneState(state.filters, {
      [action.filterId]: action.filterValue,
    }),
  });
};
const setIsLoadingHandler = function (state: State, action: SetIsLoadingAction): State {
  return cloneState(state, { isLoading: true });
};
const clearIsLoadingHandler = function (state: State, action: ClearIsLoadingAction): State {
  return cloneState(state, { isLoading: false });
};
const setQueuedRequestHandler = function (state: State, action: SetQueuedRequestAction): State {
  return cloneState(state, { hasQueuedRequest: true });
};
const clearQueuedRequestHandler = function (state: State, action: ClearQueuedRequestAction): State {
  return cloneState(state, { hasQueuedRequest: false });
};
const setDataHandler = function (state: State, action: SetDataAction) {
  return cloneState(state, { data: action.data });
};
const setMapPositionHandler = function (state: State, action: SetMapPositionAction): State {
  return cloneState(state, {
    center: action.center,
    zoom: action.zoom,
  });
};
const setLookupDataHandler = function (state: State, action: SetLookupDataAction) {
  return cloneState(state, {
    lookupData: action.lookupData,
  });
};
const selectSpotHandler = function (state: State, action: SelectSpotAction) {
  if (!state.data) {
    return state;
  }
  const selectedItem = _.find(state.data.mapMarkers, { id: action.spotId });
  if (selectedItem) {
    return cloneState(state, {
      center: {
        lat: selectedItem.lat,
        lng: selectedItem.lng,
      },
      zoom: state.zoom < 12 ? 12 : state.zoom,
      selectedItemId: action.spotId,
    });
  } else {
    return cloneState(state, {
      selectedItemId: null,
    });
  }
};
const selectMarkerHandler = function (state: State, action: SelectMarkerAction): State {
  if (!state.data) {
    return state;
  }
  const selectedItem = _.find(state.data.mapMarkers, { id: action.spotId });
  if (selectedItem) {
    return cloneState(state, {
      selectedItemId: action.spotId,
    });
  } else {
    return cloneState(state, {
      selectedItemId: null,
    });
  }
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
    default:
      (action: empty);
      return state;
  }
}

