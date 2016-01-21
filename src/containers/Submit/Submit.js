/**
 * Created by hanwencheng on 1/13/16.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {SubmitForm} from 'components';

@connect(
  () => ({}),
  {initialize})

export default class Submit extends Component{
  static propTypes = {
    initialize: PropTypes.func.isRequired
  }

  handleClick(){
    return null;
  }

  render(){
    return (
      <div className="container">
        <h1>Submit</h1>
        <Helmet title="Submit"/>

        <div style={{textAlign: 'center', margin: 15}}>
          <button className="btn btn-primary" onClick={this.handleClick}>
            <i className="fa fa-pencil"/> Initialize Form
          </button>
        </div>

        <SubmitForm onSubmit={this.handleClick}/>
      </div>
    )
  }

}