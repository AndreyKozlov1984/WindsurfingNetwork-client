import { getSpot, getSpotGallery } from './api';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_DATA = 'spots/SET_DATA';
export const SET_SELECTED = 'spots/SET_SELECTED';
export const SET_SELECTED_GALLERY = 'spots/SET_SELECTED_GALLERY';
export const SELECT_MONTH = 'spots/SELECT_MONTH';

// Actions

export function loadGallery ({ spotId, selectedMonth }) {
  return async function (dispatch, getState) {
    console.info(spotId, getState());
    if (spotId !== (getState().spots.selectedGallery || {}).id) {
      await dispatch(fetchSpotGallery(spotId));
    }
    dispatch(selectMonth(selectedMonth));
  };
}

export function fetchSpot (id) {
  return async function (dispatch, getState) {
    const result = await getSpot(id);
    dispatch(setSelected(result));
  };
}

export function fetchSpotGallery (id) {
  return async function (dispatch, getState) {
    const result = await getSpotGallery(id);
    dispatch(setSelectedGallery(result));
  };
}

export function setSelected (data) {
  return {
    type: SET_SELECTED,
    data: data,
  };
}

export function selectMonth (month) {
  return {
    type: SELECT_MONTH,
    month: month,
  };
}

export function setSelectedGallery (data) {
  return {
    type: SET_SELECTED_GALLERY,
    data: data,
  };
}

export function setData (data) {
  return {
    type: SET_DATA,
    data: data,
  };
}

export const actions = {
  setData,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_DATA]: function (state, action) {
    return {
      ...state,
      data: action.data,
    };
  },
  [SET_SELECTED]: function (state, action) {
    return {
      ...state,
      selectedSpot: action.data,
    };
  },
  [SET_SELECTED_GALLERY]: function (state, action) {
    return {
      ...state,
      selectedGallery: action.data,
    };
  },
  [SELECT_MONTH]: function (state, action) {
    return {
      ...state,
      selectedMonth: action.month,
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoading: false,
  data: null,
  selectedSpot: null,
  selectedGallery: null,
  selectedMonth: null,
};

export default function spotsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

