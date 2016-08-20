/**
 * Created by hanwencheng on 1/13/16.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
//it is not used yet
import {initialize} from 'redux-form';
import {SubmitForm} from 'components';
import connectData from 'helpers/connectData';
import {isLoaded, onLoad, onClear, onInitEntity, onSubmitNew, onClearMessage} from "redux/modules/entity"
import {Snackbar} from 'material-ui';
import uiStyles from "../../theme/uiStyles";
import {onClearAllError} from 'redux/modules/error';

function initSubmit(getState, dispatch){
  var state = getState()
  dispatch(onClear());
  dispatch(onInitEntity(state.entities.locationId, state.entities.cityList, state.auth.user._id, state.auth.user.username));
}

@connect(
  state => ({
    entity: state.entity.data,
    cachedImages : state.entity.cachedImages,
    feedback : state.entity.feedback,
    user : state.auth.user,
    imageError : state.error.error,
  }),
  {initialize, onInitEntity, onSubmitNew, onClearMessage, onClearAllError}
)

@connectData(
  initSubmit, null
)

export default class Submit extends Component{
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    onInitEntity : PropTypes.func.isRequired,
    onSubmitNew : PropTypes.func.isRequired,
    onClearMessage : PropTypes.func.isRequired,
    onClearAllError : PropTypes.func.isRequired,

    imageError : PropTypes.string,
    user : PropTypes.object,
    feedback : PropTypes.string,
    entity: PropTypes.object,
    cachedImages : PropTypes.array,
  }

  handleSubmit = (data) => {
    /**
     //validate phone number
     if(data.phone && data.phone.indexOf("+") >= 0){
      data.phone = data.phone.slice(1)
    }**/
    data.images = this.props.entity.images
    // default we don't set _id property, then do the create in database
    data.owner = this.props.user._id
    data.username = this.props.user.username
    const images = this.props.cachedImages
    this.props.onSubmitNew(data, images);
    console.log("submit new post with data:" , data)
    console.log("submit new post with images:", images )
    //this.props.initialize('register', {})
    //window.alert('Data submitted! ' + JSON.stringify(data));
  }

  render(){
    const {feedback, imageError} = this.props;
    const styles = require('./Submit.scss');

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
        <Helmet title="发布房源"/>
        <SubmitForm onSubmit={this.handleSubmit}/>

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