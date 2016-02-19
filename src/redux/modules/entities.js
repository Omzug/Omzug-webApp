/**
 * Created by hanwencheng on 1/6/16.
 */

const LOAD = 'Nevermind/entityList/LOAD';
const LOAD_SUCCESS = 'Nevermind/entityList/LOAD_SUCCESS';
const LOAD_FAIL = 'Nevermind/entityList/LOAD_FAIL';
const CLEAR = 'Nevermind/entityList/CLEAR'
const CHANGE_LOCATION = "Nevermind/entityList/CHANGE_LOCATION"
const DELETE_HOUSE = 'Nevermind/entityList/DELETE_HOUSE'
const DELETE_HOUSE_SUCCESS = 'Nevermind/entityList/DELETE_HOUSE_SUCCESS'
const DELETE_HOUSE_FAIL = 'Nevermind/entityList/DELETE_HOUSE_FAIL'

const APPEND_SUCCESS = "Nevermind/entityList/APPEND_SUCCESS"
const APPEND_FAIL = "Nevermind/entityList/APPEND_FAIL"
const DISABLE_APPEND = "Nevermind/entityList/DISABLE_APPEND"

const CITY_LIST = "Nevermind/entityList/CITY_LIST"
const CITY_LIST_SUCCESS = "Nevermind/entityList/CITY_LIST_SUCCESS"
const CITY_LIST_FAIL = "Nevermind/entityList/CITY_LIST_FAIL"

var update = require('react-addons-update');

const initState = {
  list :[],
  locationId : 0,
  loaded: false,
  loading :false,
  isEnd : false,
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
    case APPEND_SUCCESS:
          return {
            ...state,
            loading : false,
            list : update(state.list, {$push: action.result.data}),
            error : null,
            isEnd : action.result.isEnd,
          }
    case APPEND_FAIL:
          return {
            ...state,
            loading : false,
            error: action.error
          }
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        list: [],
        error: action.error
      };
    case CITY_LIST:
          return {
            loadingCity : true,
          }
    case CITY_LIST_SUCCESS:
          return {
            loadingCity : false,
            cityList : action.result.data
          }
    case CITY_LIST_FAIL :
          return {
            loadingCity : false,
            error : action.error
          }
    case CLEAR:
      return {
        initState
      }
    case DISABLE_APPEND:
          return {
            ...state,
            isEnd : true,
          }
    case CHANGE_LOCATION:
      return {
        ...state,
        locationId : action.id
      }
    default : return state;
  }
}

export function load(city){
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => {
      let url;
      if(city) {
        url = '/list/city/' + city
      }else{
        url ='/list'
      }
      return client.get(url)
    } // params not used, just shown as demonstration
  };
}

export function onAppendList(city, skipNumber){
  return {
    types: [LOAD, APPEND_SUCCESS, LOAD_FAIL],
    promise: (client) => {
      let url;
      if(city) {
        url = '/list/city/' + city + '?skip=' + skipNumber
      }else{
        url ='/list?skip=' + skipNumber
      }
      return client.get(url)
    } // params not used, just shown as demonstration
  };
}

export function onDisableAppend(){
  return {
    type : DISABLE_APPEND,
  }
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

export function getCityList(){
  return {
    types: [CITY_LIST, CITY_LIST_SUCCESS, CITY_LIST_FAIL],
    promise : (client) => {
      var url = '/cityList/';
      return client.get(url)
    }
  }
}

export function isLoaded(globalState) {
  return globalState.entities && globalState.entities.loaded;
}

export function onLocationChange(value){
  return {
    type : CHANGE_LOCATION,
    id : value,
  }
}

// to be added when we change location
function filterData(locationValue){

}

