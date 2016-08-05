/**
 * Created by hanwencheng on 1/10/16.
 */

const LOAD = 'omzug/favorite/LOAD';
const LOAD_SUCCESS = 'omzug/favorite/LOAD_SUCCESS';
const LOAD_FAIL = 'omzug/favorite/LOAD_FAIL';
const CLEAR = 'omzug/favorite/CLEAR';
const DELETE_HOUSE = 'omzug/favorite/DELETE_HOUSE'
const DELETE_HOUSE_SUCCESS = 'omzug/favorite/DELETE_HOUSE_SUCCESS'
const DELETE_HOUSE_FAIL = 'omzug/favorite/DELETE_HOUSE_FAIL'
const OPEN_DIALOG = 'omzug/favorite/OPEN_DIALOG';
const CLOSE_DIALOG = 'omzug/favorite/CLOSE_DIALOG';
const ADD_DATA = 'omzug/favorite/ADD_DATA';
const CLEAR_DELETE_FEEDBACK = "omzug/favorite/CLEAR_DELETE_FEEDBACK"

const APPEND_SUCCESS = "omzug/favorite/APPEND_SUCCESS"
const DISABLE_APPEND = "omzug/favorite/DISABLE_APPEND"

var update = require('react-addons-update');
import strings from '../../constant/strings';

const initState = {
  list :[],
  loaded: false,
  deleteFeedback : null,
  loading :false,
  popover : false,
  isEnd : false,
  toDelete : null,
};

export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        list: action.result.data,
        error: null,
        isEnd : action.result.isEnd,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        list: [],
        error: action.error
      };
    case APPEND_SUCCESS:
      return {
        ...state,
        loading : false,
        list : update(state.list, {$push: action.result.data}),
        error : null,
        isEnd : action.result.isEnd,
      }
    case CLEAR_DELETE_FEEDBACK:
      return {
        ...state,
        deleteFeedback : null,
      }
    case CLEAR:
      return {
        initState
      }
    default : return state;
  }
}

export function onLoad(userId, starList){
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => {
      var url = '/favorite/' + userId
      return client.post(url, {
        data : {
          starList : starList
        }
      })
    } // params not used, just shown as demonstration
  };
}

export function onClearDeleteFeedback(){
  return {
    type : CLEAR_DELETE_FEEDBACK,
  }
}

export function isLoaded(globalState) {
  return globalState.admin && globalState.admin.loaded;
}

// to be added when we change location
function filterData(locationValue){

}

export function onDisableAppend(){
  return {
    type : DISABLE_APPEND,
  }
}

export function onAppendList(userId, starList, skipNumber){
  return {
    types: [LOAD, APPEND_SUCCESS, LOAD_FAIL],
    promise: (client) => {
      let url = '/favorite/' + userId + '?skip=' + skipNumber
      return client.post(url, {
        data : {
          starList : starList
        }
      })
    } // params not used, just shown as demonstration
  };
}

