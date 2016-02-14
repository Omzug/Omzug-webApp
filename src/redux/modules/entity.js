/**
 * Created by hanwencheng on 1/9/16.
 */
var update = require('react-addons-update');
import cityList from '../../constant/cityList';
import {validateImage} from '../../utils/validation';

const LOAD = 'Nevermind/entity/LOAD';
const LOAD_SUCCESS = 'Nevermind/entity/LOAD_SUCCESS';
const LOAD_FAIL = 'Nevermind/entity/LOAD_FAIL';
const SUBMIT = 'Nevermind/entity/SUBMIT';
const SUBMIT_SUCCESS = 'Nevermind/entity/SUBMIT_SUCCESS';
const SUBMIT_FAIL = 'Nevermind/entity/SUBMIT_FAIL';
const CLEAR = 'Nevermind/entity/CLEAR'
const OPEN_CONTACT = "Nevermind/entity/OPEN_CONTACT";
const CLOSE_CONTACT = "Nevermind/entity/CLOSE_CONTACT";
const START_EDIT = "Nevermind/entity/START_EDIT";
const END_EDIT = "Nevermind/entity/END_EDIT";
const CACHE_DATA = "Nevermind/entity/CACHE_DATA";
const ADD_IMAGE = "Nevermind/entity/ADD_IMAGE";
const DELETE_IMAGE = "Nevermind/entity/DELETE_IMAGE";
const CHANGE_SLIDE = "Nevermind/entity/CHANGE_SLIDE";
const SUBMIT_NEW_SUCCESS = "Nevermind/entity/SUBMIT_NEW_SUCCESS";
const CLEAR_MESSAGE = "Nevermind/entity/CLEAR_MESSAGE";
const IMAGE_ERROR = "Nevermind/entity/IMAGE_ERROR";
const INIT_ENTITY = "Nevermind/entity/INIT_ENTITY";
const TOGGLE = "Nevermind/entity/TOGGLE";

const initState = {
  loaded: false,
  saveError: {},
  editing : false,
  contactOpen : false,
  data : {
    id : null,
    city: null,//which should be a string
    type : 0,
    price: 0,
    startDate : null,
    title : null,//TODO need set to null in production
    owner : null,
    username : null,

    location: null,
    roomNumber: null,
    size : null,
    caution: null,
    endDate : null,
    description: null,
    email : null,
    phone : null,
    note : null,
    maximumPerson : null ,
    images:[],
  },
  hasLimit : false,
  cachedImages:[],
  currentSlide: 0,
  feedback: null,
  createId: null,
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
        data: update(state.data, {$merge : action.result}),
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
    case SUBMIT:
      var cachedData = Object.assign({}, state.data);
      return {
        ...state,
        submitting : true,
        cached : cachedData,
        data : action.cached,
        editing : false,
        currentSlide : 0,
        feedback : "now submitting, please wait"
      }
    case SUBMIT_SUCCESS:
          //state.cachedImages.forEach(function(image){
          //  if(!image.pushed) {
          //    update(image, {$merge: {pushed : true}})
          //    cachedData.images.push(window.URL.createObjectURL(image))
          //  }
          //})
          return {
            ...state,
            submitting : false,
            //data : cachedData,
            cached : null,
            feedback : action.result.status,
          }
    case SUBMIT_NEW_SUCCESS:
      //only add a new createId property here
          return {
            ...state,
            submitting :false,
            //data : action.result.data,
            cached : null,
            feedback : "发布成功,ID是" + action.result.data.id,
            //this id should be a string
            createId : action.result.data.id,
            loaded: true,
            loading: false,
            loadedId: action.result.data.id,
            error : null,
          }
    case SUBMIT_FAIL:
      var originData = Object.assign({}, state.cached);
          return {
            ...state,
            submitting : false,
            data : originData,
            cached :null,
            feedback : action.error,
            // TODO this error is not used, or change to boolean?
            submitError : action.error,
            cachedImages : [],
          }
    case IMAGE_ERROR :
          return {
            ...state,
            feedback : action.imageError
          }
    case CLEAR:
      return initState;
    case INIT_ENTITY :
          return {
            ...state,
            data : update(state.data, {
              city : {$set : action.city ? cityList[action.city] : null},
              owner : {$set : action.owner},
              username : {$set : action.username},
              startDate : {$set : new Date()},
            }),
          }
    case CLEAR_MESSAGE:
          return {
            ...state,
            feedback : null
          }
    case CLOSE_CONTACT:
      return {
        ...state,
        contactOpen : false
      }
    case OPEN_CONTACT:
      return {
        ...state,
        contactOpen : true
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
    case TOGGLE:
          return {
            ...state,
            hasLimit : action.value,
            data : action.value ?
              update(state.data, {
                endDate : {$set : new Date()},
              })
              :
              update(state.data, {
                endDate : {$set : null}
              })
          }
    case ADD_IMAGE:
      // once only one image as input
      const image = update(state.cachedImages, {$push: [action.image]})
      console.log('after update the cachedImages are', image)
      return {
        ...state,
        cachedImages: image,
      }
    case DELETE_IMAGE:
      // notice action.id is start from 0
      const lengthRemote = state.data.images.length;
      const lengthCached = state.cachedImages.length;
      if(action.id < lengthRemote){
        return update(state, {data: {images: {$splice: [[action.id, 1]]}}});
      }else if(action.id < lengthCached + lengthRemote){
        return update(state, {cachedImages : {$splice : [[action.id - lengthRemote , 1]]}})
      }
    case CHANGE_SLIDE:
          return {
            ...state,
            currentSlide : action.page,
          }
    default :
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.entity && globalState.entity.loaded;
}

export function onClear(){
  return {
    type: CLEAR
  }
}

export function onContactOpen(){
  return {
    type: OPEN_CONTACT
  }
}

export function onContactClose(){
  return {
    type : CLOSE_CONTACT
  }
}

export function onStartEdit(){
  return {
    type : START_EDIT
  }
}

export  function onEndEdit(){
  return {
    type : END_EDIT
  }
}

export function onAddImage(images){
  console.log('in onAddImage images are', images)
  return {
    type : ADD_IMAGE,
    image : images[0],
  }
}

export function onDeleteImage(id){
  return {
    type : DELETE_IMAGE,
    id : id,
  }
}

export function onLoadInit(){
  return {
    type : LOAD_INIT,
  }
}

function generalizeParameter(data, images){
  var submitData;
  data.city = data.city.toLowerCase();
  //if(images.length > 0){
    submitData = {
      data : data,
      files : images,
    }
  //}else{
  //  submitData = data
  //}
  console.log('submit data in web is: ', submitData)
  return submitData;
}
/**
 * validate the images
 * @param images
 * @return error
 */
function checkImage(images){
  return validateImage(images)
}

export function onSubmit(data, images, entityId, ownerId){
  const imageError = checkImage(images)
  if(imageError){
    return {
      type : IMAGE_ERROR,
      imageError : imageError,
    }
  }
  return {
    cached : data,
    types: [SUBMIT, SUBMIT_SUCCESS, SUBMIT_FAIL],
    promise: (client) => client.post('./submit/'+ entityId, generalizeParameter(data, images))
  }
}


export function onSubmitNew(data, images){
  const imageError = checkImage(images)
  if(imageError){
    return {
      type : IMAGE_ERROR,
      imageError : imageError,
    }
  }
  return {
    cached : data,
    types: [SUBMIT, SUBMIT_NEW_SUCCESS, SUBMIT_FAIL],
    promise: (client) => client.post('./submit', generalizeParameter(data, images))
  }
}

export function onClearMessage(){
  return {
    type : CLEAR_MESSAGE
  }
}

export function onInitEntity(city, ownerId, username){
  return {
    type : INIT_ENTITY,
    city : city,
    owner : ownerId,
    username : username,
  }
}

export function onToggleLimit(value){
  return {
    type : TOGGLE,
    value : value
  }
}

export function onChangeSlide(page){
  return {
    type: CHANGE_SLIDE,
    page: page,
  }
}

export function onLoad(number){
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => {
      const url = '/house/' + number
      console.log('request url is', url)
      return client.get(url)
    } // params not used, just shown as demonstration
  };
}