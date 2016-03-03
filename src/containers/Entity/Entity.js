/**
 * Created by hanwencheng on 1/8/16.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {isLoaded, onLoad, onClear, onSubmit, onClearMessage} from "redux/modules/entity"
import {onClearAllError} from 'redux/modules/error';
import connectData from 'helpers/connectData';
import { SubmitForm } from 'components';
import { SubmitTemplate } from 'components';
import uiStyles from "../../theme/uiStyles";
import {Snackbar} from 'material-ui';
import Helmet from 'react-helmet';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    console.log("nothing load, after load we get state:" + getState().router.params.entityId )
    return dispatch(onLoad(getState().router.params.entityId));
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
    entity: state.entity.data,
    cachedImages : state.entity.cachedImages,
    error: state.entity.error,
    loading: state.entity.loading,
    editing: state.entity.editing,
    loadedId : state.entity.loadedId,
    feedback : state.entity.feedback,
    entityId : state.router.params.entityId,
    contactError : state.error.error,
  }),
  {onLoad, onClear, onSubmit, onClearMessage, onClearAllError}
)
export default class Entity extends Component {

  //componentDidMount() {
  //  this.setState({
  //    // route components are rendered with useful information, like URL params
  //  })
  //}
  static propTypes = {
    entity: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool,
    editing: PropTypes.bool,
    cachedImages : PropTypes.array,
    loadedId : PropTypes.string,
    feedback : PropTypes.string,
    entityId : PropTypes.string,
    contactError : PropTypes.string,

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
    // owner is included in entity
    data.images = this.props.entity.images
    // here we define a _id for update in database
    data._id = this.props.entityId

    //TODO complete the entity here
    const images = this.props.cachedImages
    this.props.onSubmit(data, images, this.props.entityId);
    console.log("submit now with data:" , data)
    console.log("submit now with images:", images )
  }
    //save(values)
    //.then(result => {
    //  if (result && typeof result.error === 'object') {
    //    return Promise.reject(result.error);
    //  }
    //})

  render(){
    const {loading, editing, feedback, contactError} = this.props;

    // for test case
    const test = false;
    const invalid = true;
    const submitting = false;

    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Entity.scss');
    const getError = () =>{
      if(feedback != null)
        return feedback
      if(contactError != null)
        return contactError
      //else
      return ""
    }

    return (
      <div>
        <Helmet title="房屋"/>
        {editing ?
          <SubmitForm onSubmit={this.handleSubmit} />
           :
          <SubmitTemplate />
        }

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
