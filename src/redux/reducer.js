import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import auth from './modules/auth';
import {reducer as form} from 'redux-form';
import info from './modules/info';
import entities from './modules/entities';
import entity from './modules/entity'
import submit from './modules/submit'
import admin from './modules/admin'

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  auth,
  form,
  info,
  entities,
  entity,
  submit,
  admin,
});
