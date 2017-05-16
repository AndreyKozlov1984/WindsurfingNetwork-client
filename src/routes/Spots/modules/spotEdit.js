// @flow
import { getSpotForm, saveSpot } from './api';
import { type State as GlobalState } from '~/store/state';
import { push, goBack } from 'react-router-redux';
import { SubmissionError } from 'redux-form';

import cloneState from '~/store/cloneState';
import { type SimpleSchool, type SpotConditions } from './spots';

export type Lookups = {|
  schools: SimpleSchool[],
|};
export type SpotForm = {|
  values: {|
    id: number,
    lat: number,
    lng: number,
    logo: string,
    name: string,
    country: string,
    region: string,
    rating: number,
    monthly_distribution: { [string]: number[] },
    photos: Array<string>,
    users: Array<number>,
    schools: Array<number>,
    surface_type: SpotConditions,
    beach_type: SpotConditions,
    wind_type: SpotConditions,
    convenience_type: SpotConditions,
    entrance_type: SpotConditions,
    benthal_type: SpotConditions,
    danger_type: SpotConditions,
  |},
  lookups: Lookups,
|};

export type SaveSpotResult = {|
  status: 'ok' | 'error',
  errors: Object,
|};

export type SetFormAction = {|
  type: 'spotForm/SET_FORM',
  data: SpotForm,
|};
// Actions
export type Action = SetFormAction;

type Dispatch = (action: Action | ThunkAction) => Promise<void>;
type GetState = () => GlobalState;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => Promise<void>;
export type State = {|
  isLoading: boolean,
  form: ?SpotForm,
|};

export function loadForm (spotId: number): ThunkAction {
  return async function (dispatch: Dispatch, getState: GetState): Promise<void> {
    const result = await getSpotForm(spotId);
    dispatch(setForm(result));
  };
}

export function submit (values: any): ThunkAction {
  console.info(values);
  return async function (dispatch: Dispatch, getState: GetState): Promise<void> {
    const result = await saveSpot(values);
    if (result.status === 'error') {
      throw new SubmissionError(result.errors);
    } else {
      dispatch(push(`/spots/${values.id}`));
    }
  };
}

export function cancel (): ThunkAction {
  return async function (dispatch: Dispatch, getState: GetState): Promise<void> {
    dispatch(goBack());
  };
}

export function setForm (data: SpotForm): SetFormAction {
  return {
    type: 'spotForm/SET_FORM',
    data: data,
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const loadFormHandler = function (state: State, action: SetFormAction): State {
  return cloneState(state, { form: action.data });
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState: State = {
  isLoading: false,
  form: null,
};

export default function spotsReducer (state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'spotForm/SET_FORM':
      return loadFormHandler(state, action);
    default:
      (action: empty);
      return state;
  }
}

