/**
 * Created by hanwencheng on 1/13/16.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {SubmitForm} from 'components';
import connectData from 'helpers/connectData';
import {isLoaded, onLoad, onClear, onSubmitNew, onCacheSubmit} from "redux/modules/entity"

function initSubmit(getState, dispatch){
  dispatch(onClear());
}

@connect(
  state => ({
    entity: state.entity.data,
    cachedImages : state.entity.cachedImages,
  }),
  {initialize, onClear, onSubmitNew}
)

@connectData(
  initSubmit, null
)

export default class Submit extends Component{
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    onClear : PropTypes.func.isRequired,
    onSubmitNew : PropTypes.func.isRequired,

    entity: PropTypes.object,
    cachedImages : PropTypes.array,
  }

  handleSubmit = (data) => {
    data.images = this.props.entity.images
    data.id = this.props.entity
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

    return (
      <div className="container">
        <h1>发布新房源</h1>
        <Helmet title="发布新房源"/>

        <SubmitForm onSubmit={this.handleSubmit}/>
      </div>
    )
  }

}