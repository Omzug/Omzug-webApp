const LOAD = 'delocate/auth/LOAD';
const LOAD_SUCCESS = 'delocate/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'delocate/auth/LOAD_FAIL';
const LOGIN = 'delocate/auth/LOGIN';
const LOGIN_SUCCESS = 'delocate/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'delocate/auth/LOGIN_FAIL';
const LOGOUT = 'delocate/auth/LOGOUT';
const LOGOUT_SUCCESS = 'delocate/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'delocate/auth/LOGOUT_FAIL';

const CLEAR_LOGIN_ERROR = 'delocate/auth/CLEAR_LOGIN_ERROR';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
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
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case CLEAR_LOGIN_ERROR:
      return {
        ...state,
        loginError : null
      }
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadAuth')
  };
}

export function login(username, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/login', {
      data: {
        username: username,
        password : password
      }
    })
  };
}

export function clearLoginError(){
  return {
    type : CLEAR_LOGIN_ERROR,
  }
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}
