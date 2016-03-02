const CLEAR_CONTACT_ERROR = 'omzug/error/CLEAR_CONTACT_ERROR';
const SET_CONTACT_ERROR = 'omzug/error/SET_CONTACT_ERROR';

const initialState = {
  contactError : null,
}

export default function info(state = initialState, action = {}) {
  switch (action.type){
    case CLEAR_CONTACT_ERROR:
          return {
            ...state,
            contactError : null
          }
    case SET_CONTACT_ERROR :
          return {
            ...state,
            contactError : action.error
          }
    default:
      return state
  }
}

export function onClearContactError() {
  return {
    type : CLEAR_CONTACT_ERROR,
  }
}

export function onSetContactError(){
  return {
    type : SET_CONTACT_ERROR,
    error : "嘿嘿,请登录"
  }
}
