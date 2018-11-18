import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  getDestinations: ['origin'],
  getMajors: ['origin', 'destination'],
  getCourses: ['origin', 'destination', 'gpa'],
  getDestinationsSuccess: ['destinations'],
  getMajorsSuccess: ['majors'],
  getCoursesSuccess: ['data'],
  setOriginSchool: ['school'],
});

export const GatewayTypes = Types;
export default Creators;
export const INITIAL_STATE = Immutable({
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

const setOriginSchool = (state, { school }) => ({
  ...state,
  school
});

export const gatewayReducer = createReducer(INITIAL_STATE, {
  [Types.GET_DESTINATIONS_SUCCESS]: getDestinationsSuccess,
  [Types.GET_MAJORS_SUCCESS]: getMajorsSuccess,
  [Types.GET_COURSES_SUCCESS]: getCoursesSuccess,
  [Types.SET_ORIGIN_SCHOOL]: setOriginSchool,
});
