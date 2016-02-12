/**
 * Created by hanwencheng on 1/13/16.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {SubmitForm} from 'components';
import connectData from 'helpers/connectData';
import {isLoaded, onLoad, onClear, onInitEntity, onSubmitNew, onClearMessage} from "redux/modules/entity"
import {Snackbar} from 'material-ui';
import uiStyles from "../../theme/uiStyles";

function initSubmit(getState, dispatch){
  var state = getState()
  dispatch(onClear());
  dispatch(onInitEntity(state.entities.locationId, state.auth.user.username));
}

@connect(
  state => ({
    entity: state.entity.data,
    cachedImages : state.entity.cachedImages,
    feedback : state.entity.feedback,
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

    feedback : PropTypes.string,
    entity: PropTypes.object,
    cachedImages : PropTypes.array,
  }

  handleSubmit = (data) => {
    data.images = this.props.entity.images
    //TODO if this id = false, then do the create
    data.id = false;
    const images = this.props.cachedImages
    this.props.onSubmitNew(data, images);
    console.log("submit now with data:" , data)
    console.log("submit now with images:", images )
    //this.props.initialize('register', {})
    //window.alert('Data submitted! ' + JSON.stringify(data));
  }

  handleInitialize = () => {
    this.props.initialize('register', {
      email: 'heawen200@gmail.com',
      username: "heawen200",
      password: "123123",
      passwordRepeat : "123123",
    });
  }

  handleEdit = (widget) => {
    const {editStart} = this.props; // eslint-disable-line no-shadow
    return () => editStart(widget.id);
  };

  render(){
    const {feedback} = this.props
    return (
      <div className="container">
        <h1>发布新房源</h1>
        <Helmet title="发布新房源"/>

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