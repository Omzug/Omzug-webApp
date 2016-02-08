/**
 * Created by hanwencheng on 1/13/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {initialize} from 'redux-form';
import {RegisterForm} from 'components';
import {register, clearLoginError} from 'redux/modules/auth';
import {Snackbar} from 'material-ui';

@connect(
  state => ({
    user: state.auth.user,
    loginError : state.auth.loginError
  }),
  {initialize, register, clearLoginError})

export default class Register extends Component{
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    clearLoginError : PropTypes.func.isRequired,
    loginError: PropTypes.string,
  }

  handleSubmit = (data) => {
    this.props.register(data)
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
    const {loginError} = this.props;
    const styles = require('./Register.scss')
    const popupStyle = { color : "red"}

    return (
      <div className="container">
        <h1>注册</h1>
        <Helmet title="Register"/>

        <div style={{textAlign: 'center', margin: 15}}>
          <button className="btn btn-primary" onClick={this.handleInitialize}>
            <i className="fa fa-pencil"/> Initialize Form
          </button>
        </div>

        <Snackbar
          open={loginError}
          message={loginError}
          autoHideDuration={4000}
          bodyStyle={popupStyle}
          onRequestClose={(reason) => {
            console.log("error popout should cleared now because : " + reason);
            this.props.clearLoginError();
          }}
        />

        <RegisterForm onSubmit={this.handleSubmit}/>
      </div>
    )
  }

}