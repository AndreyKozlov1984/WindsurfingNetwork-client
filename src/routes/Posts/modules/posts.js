import { getPosts, getPost } from './api';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_DATA = 'posts/SET_DATA';
export const SET_SELECTED = 'posts/SET_SELECTED';

// Actions
export function init () {
  return async function (dispatch, getState) {
    dispatch(reload());
  };
}

export function fetchPost (id) {
  return async function (dispatch, getState) {
    const result = await getPost(id);
    dispatch(setSelected(result));
  };
}

export function setSelected (data) {
  return {
    type: SET_SELECTED,
    data: data,
  };
}

export function reload () {
  return async function (dispatch, getState) {
    const result = await getPosts();
    dispatch(setData(result));
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
      selectedPost: action.data,
    };
  },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoading: false,
  data: null,
  selectedPost: null,
};

export default function postsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

