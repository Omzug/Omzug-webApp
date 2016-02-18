/**
 * Created by hanwencheng on 1/10/16.
 */

const LOAD = 'Nevermind/admin/LOAD';
const LOAD_SUCCESS = 'Nevermind/admin/LOAD_SUCCESS';
const LOAD_FAIL = 'Nevermind/admin/LOAD_FAIL';
const CLEAR = 'Nevermind/admin/CLEAR';
const DELETE_HOUSE = 'Nevermind/admin/DELETE_HOUSE'
const DELETE_HOUSE_SUCCESS = 'Nevermind/admin/DELETE_HOUSE_SUCCESS'
const DELETE_HOUSE_FAIL = 'Nevermind/admin/DELETE_HOUSE_FAIL'
const OPEN_DIALOG = 'Nevermind/admin/OPEN_DIALOG'
const CLOSE_DIALOG = 'Nevermind/admin/CLOSE_DIALOG'

var update = require('react-addons-update');

const initState = {
  list :[],
  loaded: false,
  deleteFeedback : null,
  loading :false,
  popover : false,
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
            deleteIndex : action.index
          }
    case DELETE_HOUSE_SUCCESS:
          var deleteIndex = state.deleteIndex
          return {
            ...state,
            deleting : false,
            deleteFeedback : "成功删除,所有相关的图片也已删除",
            // index start from 0
            list : update(state.list, {$splice : [[deleteIndex, 1]]})
          }
    case DELETE_HOUSE_FAIL:
          return {
            ...state,
            deleting : false,
            deleteFeedback : "删除失败" + action.error,
          }
    case OPEN_DIALOG :
          return {
            ...state,
            popover : true,
          }
    case CLOSE_DIALOG:
          return {
            ...state,
            popover : false,
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

export function onDeleteHouse(userId, houseId, houseIndex){
  return {
    index : houseIndex,
    types : [DELETE_HOUSE, DELETE_HOUSE_SUCCESS, DELETE_HOUSE_FAIL],
    promise : (client) => {
      var url = '/deleteHouse/' + userId +  "/" + houseId;
      return client.get(url)
    }
  }
}

export function onOpenDialog(){
  return {
    type : OPEN_DIALOG
  }
}

export function onCloseDialog(){
  return {
    type : CLOSE_DIALOG
  }
}


export function isLoaded(globalState) {
  return globalState.admin && globalState.admin.loaded;
}

// to be added when we change location
function filterData(locationValue){

}

