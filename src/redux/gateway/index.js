import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  getOriginsCodes: null,
  getDestinations: ['origin'],
  getMajors: ['origin', 'destination'],
  getCourses: ['origin', 'destination', 'major'],

  getDestinationsSuccess: ['destinations'],
  getMajorsSuccess: ['majors'],
  getCoursesSuccess: ['data'],
  getOriginsSuccess: ['originCodes'],
});

export const GatewayTypes = Types;
export default Creators;
export const INITIAL_STATE = Immutable({
  originCodes: [],
  currentOrigin: null,
  destinations: [],
  majors: [],
  courses: [],
  data: {},
});

const getDestinationsSuccess = (state, { destinations }) => ({
  ...state,
  destinations,
});

const getMajorsSuccess = (state, { majors }) => ({
  ...state,
  majors,
});

const getCoursesSuccess = (state, { data }) => ({
  ...state,
  data,
});

const getOriginsSuccess = (state, { originCodes }) => ({
  ...state,
  originCodes,
});

export const gatewayReducer = createReducer(INITIAL_STATE, {
  [Types.GET_DESTINATIONS_SUCCESS]: getDestinationsSuccess,
  [Types.GET_MAJORS_SUCCESS]: getMajorsSuccess,
  [Types.GET_COURSES_SUCCESS]: getCoursesSuccess,
  [Types.GET_ORIGINS_SUCCESS]: getOriginsSuccess,
});
