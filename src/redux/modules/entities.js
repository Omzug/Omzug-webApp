/**
 * Created by hanwencheng on 1/6/16.
 */

const LOAD = 'Nevermind/entityList/LOAD';
const LOAD_SUCCESS = 'Nevermind/entityList/LOAD_SUCCESS';
const LOAD_FAIL = 'Nevermind/entityList/LOAD_FAIL';
const CLEAR = 'Nevermind/entityList/CLEAR'
const CHANGE_LOCATION = "Nevermind/entityList/CHANGE_LOCATION"

const initState = {
  list :[],
  locationId : 0,
  loaded: false,
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
        list: action.result.list,
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
    case CLEAR:
      return {
        initState
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
        url = '/list' + '/' + city
      }else{
        url ='/list'
      }
      return client.get(url)
    } // params not used, just shown as demonstration
  };
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

