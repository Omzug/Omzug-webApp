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

const INIT = "Nevermind/entityList/INIT"
const INIT_SUCCESS = "Nevermind/entityList/INIT_SUCCESS"
const INIT_FAIL = "Nevermind/entityList/INIT_FAIL"
const SET_COLUMN = "Nevermind/entityList/SET_COLUMN"

var update = require('react-addons-update');

const initState = {
  list :[],
  locationId : null,
  loaded: false,
  loading :false,
  isEnd : false,
  cityList : [],
  column : 1,
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
      }
    case DELETE_HOUSE_SUCCESS:
      return {
        ...state,
        deleting : false,
        deleteFeedback : "成功删除,所有相关的图片也已删除",
        // index start from 0
        list : update(state.list, {$splice : [[action.index, 1]]})
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
            ...state,
            loadingCity : true,
          }
    case CITY_LIST_SUCCESS:
          return {
            ...state,
            loadingCity : false,
            cityList : processCityList(action.result.data)
          }
    case CITY_LIST_FAIL :
          return {
            ...state,
            loadingCity : false,
            error : action.error
          }
    case INIT :
          return {
            ...state,
            loading : true,
            loadingCity : true,
          }
    case INIT_SUCCESS:
          return {
            ...state,
            loading: false,
            loaded: true,
            list: action.result.houses,
            error: null,
            isEnd : action.result.isEnd,
            loadingCity : false,
            cityList : processCityList(action.result.cities)
          }
    case INIT_FAIL:
          return {
            ...state,
            loading: false,
            loaded: false,
            loadingCity : false,
            list: [],
            error: action.error
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
    case SET_COLUMN :
          return {
            ...state,
            column : action.number,
          }
    default : return state;
  }
}

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function processCityList(cityList){
  var selectList = []
  cityList.forEach(function(city, index){
    selectList.push({
      value : index,
      label : capitalizeFirstLetter(city)
    })
  })
  return selectList;
}

export function onGetHouseList(cityIndex, cityList){
  var city = null
  if(cityIndex !== null) {
    city = cityList[cityIndex].label.toLowerCase();
  }
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

export function onInit(){
  return {
    types: [INIT, INIT_SUCCESS, INIT_FAIL],
    promise: (client) => {
      let  url = '/initList'
      return client.get(url)
    } // params not used, just shown as demonstration
  };
}

export function onAppendList(cityIndex, cityList, skipNumber){
  var city = null
  if(cityIndex !== null) {
    city = cityList[cityIndex].label.toLowerCase();
  }
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

export function onSetColumn(number){
  return {
    type : SET_COLUMN,
    number : number,
  }
}

export function onGetCityList(){
  return {
    types: [CITY_LIST, CITY_LIST_SUCCESS, CITY_LIST_FAIL],
    promise : (client) => {
      var url = '/cityList';
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

