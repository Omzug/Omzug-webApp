/**
 * Created by hanwencheng on 1/10/16.
 */

const LOAD = 'Nevermind/admin/LOAD';
const LOAD_SUCCESS = 'Nevermind/admin/LOAD_SUCCESS';
const LOAD_FAIL = 'Nevermind/admin/LOAD_FAIL';
const CLEAR = 'Nevermind/admin/CLEAR'

const initState = {
  list :[],
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
      const url = '/list/user/' + userId
      return client.get(url)
    } // params not used, just shown as demonstration
  };
}


export function isLoaded(globalState) {
  return globalState.admin && globalState.admin.loaded;
}

// to be added when we change location
function filterData(locationValue){

}

