/**
 * Created by hanwencheng on 1/13/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {RegisterForm} from 'components';

@connect(
  () => ({}),
  {initialize})

export default class Register extends Component{
  static propTypes = {
    initialize: PropTypes.func.isRequired
  }

  handleClick = (data) => {
    console.log('data is', data)
    this.props.initialize('register', {})
    //window.alert('Data submitted! ' + JSON.stringify(data));
  }

  handleInitialize = () => {
    this.props.initialize('register', {
      email: 'heawen.cheng@gmail.com'
    });
  }

  render(){
    return (
      <div className="container">
        <h1>Register</h1>
        <Helmet title="Register"/>

        <div style={{textAlign: 'center', margin: 15}}>
          <button className="btn btn-primary" onClick={this.handleInitialize}>
            <i className="fa fa-pencil"/> Initialize Form
          </button>
        </div>

        <RegisterForm onSubmit={this.handleClick}/>
      </div>
    )
  }

}