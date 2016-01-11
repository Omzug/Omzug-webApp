/**
 * Created by hanwencheng on 1/6/16.
 */

const LOAD = 'Nevermind/entityList/LOAD';
const LOAD_SUCCESS = 'Nevermind/entityList/LOAD_SUCCESS';
const LOAD_FAIL = 'Nevermind/entityList/LOAD_FAIL';
const CLEAR = 'Nevermind/entityList/CLEAR'

export function load(){
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => {
      let url = '/list'
      return client.get(url)
    } // params not used, just shown as demonstration
  };
}

export function isLoaded(globalState) {
  return globalState.entity && globalState.entity.loaded;
}

const initState = {
  list :[]
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
    default : return state;
  }
}
