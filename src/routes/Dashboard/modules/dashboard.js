import required from 'required-argument';
import { getDashboardContent, getLookupData } from './api';
import _ from 'lodash';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_FILTER_STATE = 'dashboard/SET_FILTER_STATE';
export const SELECT_ALL = 'dashboard/SELECT_ALL';
export const SELECT_NONE = 'dashboard/SELECT_NONE';
export const UPDATE_UI_FILTERS = 'dashboard/UPDATE_UI_FILTERS';
export const SET_IS_LOADING = 'dashboard/SET_IS_LOADING';
export const CLEAR_IS_LOADING = 'dashboard/CLEAR_IS_LOADING';
export const SET_DATA = 'dashboard/SET_DATA';
export const SET_QUEUED_REQUEST = 'dashboard/SET_QUEUED_REQUEST';
export const CLEAR_QUEUED_REQUEST = 'dashboard/CLEAR_QUEUED_REQUEST';
export const SET_MAP_POSITION = 'dashboard/SET_MAP_POSITION';
export const REQUEST_FIT_BOUNDS = 'dashboard/REQUEST_FIT_BOUNDS';
export const SET_LOOKUP_DATA = 'dashboard/SET_LOOKUP_DATA';
export const SELECT_SPOT = 'dashboard/SELECT_SPOT';
export const SELECT_MARKER = 'dashboard/SELECT_MARKER';
export const SET_SCROLL = 'dashboard/SET_SCROLL';

// ------------------------------------
// Actions
// ------------------------------------
export function setFilterState ({ filterId = required(), filterValue = required() }) {
  return async function (dispatch, getState) {
    dispatch(updateUiFilters({ filterId, filterValue }));
    dispatch(reload());
    // reloadMap
  };
}

export function init () {
  return async function (dispatch, getState) {
    console.info('dashboard init!');
    dispatch(loadLookup());
    dispatch(reload());
  };
}
export function loadLookup () {
  return async function (dispatch, getState) {
    const data = await getLookupData();
    dispatch(setLookupData(data));
    dispatch(reload());
  };
}

export function setLookupData (data) {
  return {
    type: SET_LOOKUP_DATA,
    data: data,
  };
}

export function reload () {
  return async function (dispatch, getState) {
    const isLoading = () => getState().dashboard.isLoading;
    const hasQueuedRequest = () => getState().dashboard.hasQueuedRequest;
    if (!isLoading()) {
      dispatch(setIsLoading());

      const filters = getState().dashboard.filters;
      const result = await getDashboardContent(filters);

      dispatch(clearIsLoading());
      dispatch(setData(result));
      dispatch(requestFitBounds());
      if (hasQueuedRequest()) {
        dispatch(clearQueuedRequest());
        dispatch(reload());
      }
    } else {
      dispatch(setQueuedRequest());
    }
  };
}

export function clearQueuedRequest () {
  return {
    type: CLEAR_QUEUED_REQUEST,
  };
}

export function setQueuedRequest () {
  return {
    type: SET_QUEUED_REQUEST,
  };
}

export function updateUiFilters ({ filterId = required(), filterValue = required() }) {
  return {
    type: UPDATE_UI_FILTERS,
    filterId,
    filterValue,
  };
}

export function selectAll () {
  return {
    type: SELECT_ALL,
  };
}

export function selectNone () {
  return {
    type: SELECT_NONE,
  };
}

export function selectSpot (spotId) {
  return {
    type: SELECT_SPOT,
    spotId: spotId,
  };
}

export function selectMarker (spotId) {
  return {
    type: SELECT_MARKER,
    spotId: spotId,
  };
}

export function setScroll (offset) {
  return {
    type: SET_SCROLL,
    offset: offset,
  };
}

export function setIsLoading () {
  return {
    type: SET_IS_LOADING,
  };
}

export function clearIsLoading () {
  return {
    type: CLEAR_IS_LOADING,
  };
}

export function setData (data) {
  return {
    type: SET_DATA,
    data: data,
  };
}

export function setMapPosition (mapPosition) {
  return {
    type: SET_MAP_POSITION,
    ...mapPosition,
  };
}

export function requestFitBounds () {
  return { type: REQUEST_FIT_BOUNDS };
}

export const actions = {
  setFilterState,
  selectAll,
  selectNone,
  updateUiFilters,
  setIsLoading,
  clearIsLoading,
  setData,
  setMapPosition,
  requestFitBounds,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_UI_FILTERS]: function (state, action) {
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.filterId]: action.filterValue,
      },
    };
  },
  [SELECT_ALL]: function (state, action) {
    return {
      ...state,
      filters: {
        ...state.filters,
        water: {
          kind1: true,
          kind2: true,
          kind3: true,
          kind4: true,
        },
        beach: {
          sandy: true,
          rocky: true,
        },
      },
    };
  },
  [SELECT_NONE]: function (state, action) {
    return {
      ...state,
      filters: {
        ...state.filters,
        water: {
          kind1: false,
          kind2: false,
          kind3: false,
          kind4: false,
        },
        beach: {
          sandy: false,
          rocky: false,
        },
      },
    };
  },
  [SET_IS_LOADING]: function (state, action) {
    return { ...state, isLoading: true };
  },
  [CLEAR_IS_LOADING]: function (state, action) {
    return { ...state, isLoading: false };
  },
  [SET_QUEUED_REQUEST]: function (state, action) {
    return { ...state, hasQueuedRequest: true };
  },
  [CLEAR_QUEUED_REQUEST]: function (state, action) {
    return { ...state, hasQueuedRequest: false };
  },
  [SET_DATA]: function (state, action) {
    return {
      ...state,
      data: action.data,
    };
  },
  [SET_MAP_POSITION]: function (state, action) {
    console.info(action);
    return {
      ...state,
      map: {
        ...state.map,
        center: action.center,
        zoom: action.zoom,
        fitBounds: false,
      },
    };
  },
  [REQUEST_FIT_BOUNDS]: function (state, action) {
    console.info(action);
    return {
      ...state,
      map: {
        ...state.map,
        fitBounds: true,
      },
    };
  },
  [SET_LOOKUP_DATA]: function (state, action) {
    return {
      ...state,
      lookup: action.data,
    };
  },
  [SELECT_SPOT]: function (state, action) {
    const selectedItem = _.find(state.data.mapMarkers, { id: action.spotId });
    if (selectedItem) {
      return {
        ...state,
        map: {
          ...state.map,
          center: {
            lat: +selectedItem.lat,
            lng: +selectedItem.lng,
          },
          zoom: state.map.zoom < 12 ? 12 : state.map.zoom,
        },
        selectedItemId: action.spotId,
      };
    } else {
      return {
        ...state,
        selectedItemId: null,
      };
    }
  },
  [SELECT_MARKER]: function (state, action) {
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
  },
  [SET_SCROLL]: function (state, action) {
    return {
      ...state,
      scrollPosition: action.offset,
      scrollToSelected: false,
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoading: false,
  map: {
    center: { lat: 23.34, lng: 34.45 },
    zoom: 3,
  },
  filters: {},
  selectedItemId: null,
  scrollPosition: 0,
};

export default function dashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

