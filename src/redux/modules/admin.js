/**
 * Created by hanwencheng on 1/10/16.
 */

const LOAD = 'omzug/admin/LOAD';
const LOAD_SUCCESS = 'omzug/admin/LOAD_SUCCESS';
const LOAD_FAIL = 'omzug/admin/LOAD_FAIL';
const CLEAR = 'omzug/admin/CLEAR';
const DELETE_HOUSE = 'omzug/admin/DELETE_HOUSE'
const DELETE_HOUSE_SUCCESS = 'omzug/admin/DELETE_HOUSE_SUCCESS'
const DELETE_HOUSE_FAIL = 'omzug/admin/DELETE_HOUSE_FAIL'
const OPEN_DIALOG = 'omzug/admin/OPEN_DIALOG';
const CLOSE_DIALOG = 'omzug/admin/CLOSE_DIALOG';
const ADD_DATA = 'omzug/admin/ADD_DATA';
const CLEAR_DELETE_FEEDBACK = "omzug/admin/CLEAR_DELETE_FEEDBACK"

var update = require('react-addons-update');
import strings from '../../constant/strings';

const initState = {
  list :[],
  loaded: false,
  deleteFeedback : null,
  loading :false,
  popover : false,
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
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        list: [],
        error: action.error
      };
    case DELETE_HOUSE:
          return {
            ...state,
            deleting : true,
          }
    case DELETE_HOUSE_SUCCESS:
          return {
            ...state,
            deleting : false,
            deleteFeedback : strings.deleteSuccess,
            // index start from 0
            list : update(state.list, {$splice : [[action.index, 1]]})
          }
    case DELETE_HOUSE_FAIL:
          return {
            ...state,
            deleting : false,
            deleteFeedback : strings.deleteError + action.error,
          }
    case OPEN_DIALOG :
          return {
            ...state,
            toDelete : {
              house : action.house,
              index : action.index,
            },
            popover : true,
          }
    case CLOSE_DIALOG:
          return {
            ...state,
            popover : false,
          }
    case ADD_DATA : {
      var updated = update(state.list, {$splice : [[0, 0 , action.data]]})
      if(state.loaded)
        return {
          ...state,
          list : updated
        }
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

export function onLoad(userId){
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => {
      var url = '/list/user/' + userId
      return client.get(url)
    } // params not used, just shown as demonstration
  };
}

export function onDeleteHouse(userId, houseId, index){
  return {
    index : index,
    types : [DELETE_HOUSE, DELETE_HOUSE_SUCCESS, DELETE_HOUSE_FAIL],
    promise : (client) => {
      var url = '/deleteHouse/' + userId +  "/" + houseId;
      return client.get(url)
    }
  }
}

export function onOpenDialog(house, index){
  return {
    house : house,
    index : index,
    type : OPEN_DIALOG
  }
}

export function onCloseDialog(){
  return {
    type : CLOSE_DIALOG
  }
}

export function onAddData(data){
  return {
    type : ADD_DATA,
    data : data
  }
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

