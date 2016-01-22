/**
 * Created by hanwencheng on 1/13/16.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {SubmitForm} from 'components';

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

  render(){
    return (
      <div className="container">
        <h1>Submit</h1>
        <Helmet title="Submit"/>

        <div style={{textAlign: 'center', margin: 15}}>
          <button className="btn btn-primary" onClick={this.handleInitialize}>
            <i className="fa fa-pencil"/> Initialize Form
          </button>
        </div>

        <SubmitForm onSubmit={this.handleSubmit}/>
      </div>
    )
  }

}