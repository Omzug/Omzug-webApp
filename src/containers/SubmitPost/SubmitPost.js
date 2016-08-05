/**
 * Created by hanwencheng on 1/13/16.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
//it is not used yet
import {initialize} from 'redux-form';
import {PostForm} from 'components';
import connectData from 'helpers/connectData';
import {isLoaded, onLoad, onClear, onInitPost, onSubmitNew, onClearMessage} from "redux/modules/post"
import {Snackbar} from 'material-ui';
import uiStyles from "../../theme/uiStyles";
import {onClearAllError} from 'redux/modules/error';
import cityList from '../../constant/cityList'

function initSubmit(getState, dispatch){
  var state = getState()
  dispatch(onClear());
  dispatch(onInitPost(state.posts.locationId, cityList, state.auth.user._id, state.auth.user.username));
}

@connect(
  state => ({
    post: state.post.data,
    cachedImages : state.post.cachedImages,
    feedback : state.post.feedback,
    user : state.auth.user,
    imageError : state.error.error,
  }),
  {initialize, onInitPost, onSubmitNew, onClearMessage, onClearAllError}
)

@connectData(
  initSubmit, null
)

export default class SubmitPost extends Component{
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    onInitPost : PropTypes.func.isRequired,
    onSubmitNew : PropTypes.func.isRequired,
    onClearMessage : PropTypes.func.isRequired,
    onClearAllError : PropTypes.func.isRequired,

    imageError : PropTypes.string,
    user : PropTypes.object,
    feedback : PropTypes.string,
    post: PropTypes.object,
    cachedImages : PropTypes.array,
  }

  handleSubmit = (data) => {
    data.images = this.props.post.images
    // default we don't set _id property, then do the create in database
    data.owner = this.props.user._id
    data.username = this.props.user.username
    const images = this.props.cachedImages
    this.props.onSubmitNew(data, images);
    console.log("submit new post now with data:" , data)
    console.log("submit new post now with images:", images )
  }

  render(){
    const {feedback, imageError} = this.props;
    const styles = require('./SubmitPost.scss');

    const getError = () =>{
      if(feedback != null)
        return feedback
      if(imageError != null)
        return imageError
      //else
      return ""
    }

    return (
      <div>
        <Helmet title="发布求房信息"/>
        <PostForm onSubmit={this.handleSubmit}/>

        <Snackbar
          open={ feedback != null || imageError != null}
          message={getError()}
          autoHideDuration={4000}
          bodyStyle={uiStyles.snackBarStyleBlue}
          onRequestClose={(reason) => {
            this.props.onClearMessage();
            this.props.onClearAllError();
          }}
        />
      </div>
    )
  }

}