/**
 * Created by hanwencheng on 3/7/16.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {isLoaded, onLoad, onClear, onSubmit, onClearMessage} from "redux/modules/post"
import {onClearAllError} from 'redux/modules/error';
import connectData from 'helpers/connectData';
import { PostForm } from 'components';
import { PostTemplate } from 'components';
import { NotFound } from 'containers';
import uiStyles from "../../theme/uiStyles";
import {Snackbar} from 'material-ui';
import Helmet from 'react-helmet';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    console.log("nothing load, after load we get state:" + getState().router.params.postId )
    return dispatch(onLoad(getState().router.params.postId));
  }
}

//get the params only after page loaded
function checkState(getState, dispatch){

}

@connectData(
  checkState, fetchDataDeferred
)
@connect(
  state => ({
    loadError : state.post.loadError,
    post: state.post.data,
    cachedImages : state.post.cachedImages,
    error: state.post.error,
    loading: state.post.loading,
    editing: state.post.editing,
    loadedId : state.post.loadedId,
    feedback : state.post.feedback,
    postId : state.router.params.postId,
    contactError : state.error.error,
  }),
  {onLoad, onClear, onSubmit, onClearMessage, onClearAllError}
)
export default class Post extends Component {

  static propTypes = {
    post: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool,
    editing: PropTypes.bool,
    cachedImages : PropTypes.array,
    loadedId : PropTypes.string,
    feedback : PropTypes.string,
    postId : PropTypes.string,
    contactError : PropTypes.string,
    loadError : PropTypes.string,

    //editStart: PropTypes.func.isRequired,
    onClearAllError : PropTypes.func.isRequired,
    onClear : PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClearMessage : PropTypes.func.isRequired,
  }

  handleSubmit = (data) => {
    /**
     //validate phone number
     if(data.phone && data.phone.indexOf("+") >= 0){
      data.phone = data.phone.slice(1)
    }**/
      // owner is included in post
    data.images = this.props.post.images
    // here we define a _id for update in database
    data._id = this.props.postId
    data.owner = this.props.post.owner
    data.username = this.props.post.username

    //TODO complete the post here
    const images = this.props.cachedImages
    this.props.onSubmit(data, images, this.props.postId);
    console.log("submit post now with data:" , data)
    console.log("submit post now with images:", images )
  }

  render(){
    const {loading, editing, feedback, contactError} = this.props;

    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Post.scss');
    const getError = () =>{
      if(feedback != null)
        return feedback
      if(contactError != null)
        return contactError
      //else
      return ""
    }

    const renderMain = () => {
      if(this.props.loadError){
        return <NotFound/>
      }else if(editing){
        return <PostForm onSubmit={this.handleSubmit} />
      }else{
        return <PostTemplate />
      }
    }

    return (
      <div>
        <Helmet title="求租信息"/>

        {renderMain()}

        <Snackbar
          open={feedback != null || contactError != null}
          message={ getError()}
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
