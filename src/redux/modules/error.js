const CLEAR_ERROR = 'omzug/error/CLEAR_ERROR';
const SET_ERROR = 'omzug/error/SET_ERROR';

const initialState = {
  hasError : false,
  error : null,
}

export default function info(state = initialState, action = {}) {
  switch (action.type){
    case CLEAR_ERROR:
          return initialState
    case SET_ERROR :
          return {
            ...state,
            hasError : true,
            error : action.error
          }
    default:
      return state
  }
}

export function onClearAllError() {
  return {
    type : CLEAR_ERROR,
  }
}

export function onSetError(errorString){
  return {
    type : SET_ERROR,
    error : errorString,
  }
}
