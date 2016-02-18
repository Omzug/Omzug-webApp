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

function initSubmit(getState, dispatch){
  var state = getState()
  dispatch(onClear());
  dispatch(onInitEntity(state.entities.locationId, state.auth.user._id, state.auth.user.username));
}

@connect(
  state => ({
    entity: state.entity.data,
    cachedImages : state.entity.cachedImages,
    feedback : state.entity.feedback,
    user : state.auth.user,
  }),
  {initialize, onInitEntity, onSubmitNew, onClearMessage}
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
    console.log("submit now with data:" , data)
    console.log("submit now with images:", images )
    //this.props.initialize('register', {})
    //window.alert('Data submitted! ' + JSON.stringify(data));
  }

  render(){
    const {feedback} = this.props;
    const styles = require('./Submit.scss');
    return (
      <div>
        <SubmitForm onSubmit={this.handleSubmit}/>

        <Snackbar
          open={feedback}
          message={feedback}
          autoHideDuration={4000}
          bodyStyle={uiStyles.snackBarStyle}
          onRequestClose={(reason) => {
            console.log("error popout should cleared now because : " + reason);
            this.props.onClearMessage();
          }}
        />
      </div>
    )
  }

}