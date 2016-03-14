/**
 * Created by hanwencheng on 3/5/16.
 */

const LOAD = 'omzug/postList/LOAD';
const LOAD_SUCCESS = 'omzug/postList/LOAD_SUCCESS';
const LOAD_FAIL = 'omzug/postList/LOAD_FAIL';
const CLEAR = 'omzug/postList/CLEAR'
const CHANGE_LOCATION = "omzug/postList/CHANGE_LOCATION"
const DELETE_POST = 'omzug/postList/DELETE_POST'
const DELETE_POST_SUCCESS = 'omzug/postList/DELETE_POST_SUCCESS'
const DELETE_POST_FAIL = 'omzug/postList/DELETE_POST_FAIL'

const APPEND_SUCCESS = "omzug/postList/APPEND_SUCCESS"
const APPEND_FAIL = "omzug/postList/APPEND_FAIL"
const DISABLE_APPEND = "omzug/postList/DISABLE_APPEND"

const OPEN_DIALOG = 'omzug/postList/OPEN_DIALOG';
const CLOSE_DIALOG = 'omzug/postList/CLOSE_DIALOG';

const INIT = "omzug/postList/INIT"
const INIT_SUCCESS = "omzug/postList/INIT_SUCCESS"
const INIT_FAIL = "omzug/postList/INIT_FAIL"
const SET_COLUMN = "omzug/postList/SET_COLUMN"
const REFRESH_ALL = "omzug/postList/REFRESH_ALL"
const REFRESH_ALL_SUCCESS = "omzug/postList/REFRESH_ALL_SUCCESS"
const REFRESH_ALL_FAIL = "omzug/postList/REFRESH_ALL_FAIL"
const CLEAR_DELETE_FEEDBACK = "omzug/postList/CLEAR_DELETE_FEEDBACK"

var update = require('react-addons-update');
import strings from '../../constant/strings';

const initState = {
  list :[],
  locationId : null,
  loaded: false,
  loading :false,
  isEnd : false,
  column : 1,
  deleteFeedback : null,
  popover : false,
  toDelete : null,
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
    case DELETE_POST:
      return {
        ...state,
        deleting : true,
      }
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        deleting : false,
        deleteFeedback : strings.deleteSuccess,
        // index start from 0
        list : update(state.list, {$splice : [[action.index, 1]]})
      }
    case DELETE_POST_FAIL:
      return {
        ...state,
        deleting : false,
        deleteFeedback : strings.deleteError + action.error,
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
    case REFRESH_ALL:
      return {
        ...state,
        loading: true,
        loadingCity : true
      }
    case REFRESH_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        //TODO error here
        //list: action.result.postList,
        error: null,
        isEnd : action.result.isEnd,
        loadingCity : false,
        locationId : null,
      }
    case REFRESH_ALL_FAIL :
      return {
        ...state,
        loadingCity : false,
        loading: false,
        list: [],
        error: action.error,
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
        list: action.result.posts,
        error: null,
        isEnd : action.result.isEnd,
        loadingCity : false,
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
    case CLEAR_DELETE_FEEDBACK:
      return {
        ...state,
        deleteFeedback : null,
      }
    case OPEN_DIALOG :
      return {
        ...state,
        toDelete : {
          post : action.post,
          index : action.index,
        },
        popover : true,
      }
    case CLOSE_DIALOG:
      return {
        ...state,
        popover : false,
      }
    default : return state;
  }
}

function processCityList(cityList){
  var selectList = []
  cityList.forEach(function(city, index){
    selectList.push({
      value : index,
      label : city
    })
  })
  return selectList;
}

export function onGetPostList(cityIndex, cityList){
  var city = null
  if(cityIndex !== null) {
    city = cityList[cityIndex].label;
  }
  console.log('city is', city);
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => {
      let url;
      if(city) {
        url = '/listPosts/city/' + city
      }else{
        url ='/listPosts'
      }
      return client.get(url)
    } // params not used, just shown as demonstration
  };
}

export function onAppendList(cityIndex, cityList, skipNumber){
  var city = null
  if(cityIndex !== null) {
    city = cityList[cityIndex].label;
  }
  return {
    types: [LOAD, APPEND_SUCCESS, LOAD_FAIL],
    promise: (client) => {
      let url;
      if(city) {
        url = '/listPosts/city/' + city + '?skip=' + skipNumber
      }else{
        url ='/listPosts?skip=' + skipNumber
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

export function onDeletePost(userId, postId, index){
  return {
    index : index,
    types : [DELETE_POST, DELETE_POST_SUCCESS, DELETE_POST_FAIL],
    promise : (client) => {
      var url = '/deletePost/' + userId +  "/" + postId;
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

export function onClearDeleteFeedback(){
  return {
    type : CLEAR_DELETE_FEEDBACK,
  }
}

export function isLoaded(globalState) {
  return globalState.posts && globalState.posts.loaded;
}

export function onLocationChange(value){
  return {
    type : CHANGE_LOCATION,
    id : value,
  }
}

export function onOpenDialog(post, index){
  return {
    post : post,
    index : index,
    type : OPEN_DIALOG
  }
}

export function onCloseDialog(){
  return {
    type : CLOSE_DIALOG
  }
}

// to be added when we change location
function filterData(locationValue){

}
