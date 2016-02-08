/**
 * Created by hanwencheng on 1/13/16.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {SubmitForm} from 'components';
import {editStart, editStop } from 'redux/modules/submit'

@connect(
  state => ({

  }),
  {initialize})

export default class Submit extends Component{
  static propTypes = {
    initialize: PropTypes.func.isRequired
  }

  handleSubmit = (data) => {
    console.log('data is', data)
    //this.props.register(data)
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
        <h1>Submit</h1>
        <Helmet title="Submit"/>

        <SubmitForm onSubmit={this.handleSubmit}/>
      </div>
    )
  }

}