const LOAD = 'omzug/auth/LOAD';
const LOAD_SUCCESS = 'omzug/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'omzug/auth/LOAD_FAIL';
const LOGIN = 'omzug/auth/LOGIN';
const LOGIN_SUCCESS = 'omzug/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'omzug/auth/LOGIN_FAIL';
const LOGOUT = 'omzug/auth/LOGOUT';
const LOGOUT_SUCCESS = 'omzug/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'omzug/auth/LOGOUT_FAIL';

const CHECK = 'omzug/auth/CHECK';
const CHECK_SUCCESS = 'omzug/auth/CHECK_SUCCESS';
const CHECK_FAIL = 'omzug/auth/CHECK_FAIL';

const CLEAR_LOGIN_ERROR = 'omzug/auth/CLEAR_LOGIN_ERROR';

const TOGGLE_STAR = "omzug/admin/TOGGLE_STAR";
const TOGGLE_STAR_SUCCESS = "omzug/admin/TOGGLE_STAR_SUCCESS";
const TOGGLE_STAR_FAIL = "omzug/admin/TOGGLE_STAR_FAIL";

import strings from '../../constant/strings';
var update = require('react-addons-update');

const initialState = {
  loaded: false,
  loginError: null,
  loggingIn : false,
  staring : false,
  cachedStarList : [],
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
        loginError: {error : strings.loginFailError}
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
        loginError : null,
        error : null,
      }
    case CHECK:
        return {
          ...state,
          check: "checking"
        };
    case CHECK_SUCCESS:
          return {
            ...state,
            check : "success",
            checkMessage : action.result
          }
    case CHECK_FAIL:
          return {
            ...state,
            check : "fail",
            checkError : action.error
          }
    case TOGGLE_STAR:
      return {
        ...state,
        cachedStarList : action.cached,
        user : update(state.user, { starList : {$set : action.newList } }),
        staring : true,
      }
    case TOGGLE_STAR_SUCCESS:
      //server return an array of stared entities, but do nothing here
      return {
        ...state,
        staring : false,
        cachedStarList: null,
      }
    case TOGGLE_STAR_FAIL:
      var originList = Object.assign({}, state.cachedStarList)
      return {
        ...state,
        staring : false,
        user : update(state.user, { starList : {$set : originList }}),
        cachedStarList : null,
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

//email must be a string
export function check(email){
  return {
    types: [CHECK, CHECK_SUCCESS, CHECK_FAIL],
    promise : (client) => client.get('/check?email=' + email)
  }
}

export function login(email, password) {
  if(!email){
    return {
      type: LOGIN_FAIL,
      error : strings.missEmailError,
    }
  }else if(!password){
    return {
      type: LOGIN_FAIL,
      error : strings.missPasswordError,
    }
  }
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/login', {
      data: {
        email: email,
        password : password
      }
    })
  };
}

//it also use the same action as log, because most thing is the same
export function register(data){
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('./register', {
      data : data
    })
  }
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

export function onToggleStar(userId, houseId, starList){
  //in case the old database data don't have starList
  if(starList == null) starList = [];
  var index = starList.indexOf(houseId)
  var cached = Object.assign({}, starList);
  var newList = index == -1
    ? update(starList, {$push : [houseId]})
    : update(starList, {$splice : [[index, 1]]});
  return {
    cached : cached,
    newList : newList,
    types : [TOGGLE_STAR, TOGGLE_STAR_SUCCESS, TOGGLE_STAR_FAIL],
    promise: (client) => client.post('./toggleStar/'+ userId + '/' + houseId, { data : newList })
  }
}
