/**
 * Created by hanwencheng on 3/5/16.
 */

const OPEN_DIALOG = 'omzug/posts/OPEN_DIALOG';
const CLOSE_DIALOG = 'omzug/posts/CLOSE_DIALOG';
const CLEAR = 'omzug/posts/CLEAR';

const LOAD = 'omzug/posts/LOAD';
const LOAD_SUCCESS = 'omzug/posts/LOAD_SUCCESS';
const LOAD_FAIL = 'omzug/posts/LOAD_FAIL';
const DELETE_POST = 'omzug/posts/DELETE_POST'
const DELETE_POST_SUCCESS = 'omzug/posts/DELETE_POST_SUCCESS'
const DELETE_POST_FAIL = 'omzug/posts/DELETE_POST_FAIL'
const APPEND_SUCCESS = "omzug/posts/APPEND_SUCCESS"
const APPEND_FAIL = "omzug/posts/APPEND_FAIL"
const DISABLE_APPEND = "omzug/posts/DISABLE_APPEND"

const START_EDIT = "omzug/posts/START_EDIT";
const END_EDIT = "omzug/posts/END_EDIT";
const SET_COLUMN = "omzug/posts/SET_COLUMN"

import strings from '../../constant/strings';
import {capitalizeFirstLetter} from '../../utils/help';

const initState = {
  list :[],
  loaded: false,
  deleteFeedback : null,
  loading :false,
  popover : false,
  toDelete : null,

  editing : false,
  column : 1,
  locationId : null,
  isEnd : false,
  cityList : [],
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
    case DISABLE_APPEND:
      return {
        ...state,
        isEnd : true,
      }
    case OPEN_DIALOG :
      return {
        ...state,
        toDelete: {
          post: action.post,
          index: action.index,
        },
        popover: true,
      }
    case CLOSE_DIALOG:
      return {
        ...state,
        popover: false,
      }
    case CLEAR:
      return {
        initState
      }
    case SET_COLUMN :
      return {
        ...state,
        column : action.number,
      }
    case START_EDIT:
      return {
        ...state,
        editing : true
      }
    case END_EDIT:
      return {
        ...state,
        editing :false
      }
    default :
      return state;
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

export function onStartEdit(){
  return {
    type : START_EDIT
  }
}

export function onOpenDialog(post, index){
  return {
    post : post,
    index : index,
    type : OPEN_DIALOG
  }
}

//it may not be used
export  function onEndEdit(){
  return {
    type : END_EDIT
  }
}

export function onCloseDialog(){
  return {
    type : CLOSE_DIALOG
  }
}