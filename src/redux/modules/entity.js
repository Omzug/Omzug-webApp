/**
 * Created by hanwencheng on 1/9/16.
 */

const LOAD = 'Nevermind/entity/LOAD';
const LOAD_SUCCESS = 'Nevermind/entity/LOAD_SUCCESS';
const LOAD_FAIL = 'Nevermind/entity/LOAD_FAIL';
const CLEAR = 'Nevermind/entity/CLEAR'

const initState = {
  loaded: false,
  saveError: {},
};

export default function reducer(state = initState, action){
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
        loadedId : action.result.id,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case CLEAR:
      return {
        initState
      }
    default :
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.entity && globalState.entity.loaded;
}

export function clear(){
  return {
    type: CLEAR
  }
}

export function load(number){
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => {
      const url = '/list/' + number
      return client.get(url)
    } // params not used, just shown as demonstration
  };
}