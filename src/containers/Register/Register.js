/**
 * Created by hanwencheng on 1/13/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {RegisterFrom} from 'components';

@connect(
  () => ({}),
  {initialize})

export default class Register extends Component{
  static propTypes = {
    initialize: PropTypes.func.isRequired
  }

  handleClick(){
    return null;
  }

  render(){
    return (
      <div className="container">
        <h1>Register</h1>
        <Helmet title="Register"/>

        <div style={{textAlign: 'center', margin: 15}}>
          <button className="btn btn-primary" onClick={this.handleClick}>
            <i className="fa fa-pencil"/> Initialize Form
          </button>
        </div>

        <RegisterForm onSubmit={this.handleClick}/>
      </div>
    )
  }

}