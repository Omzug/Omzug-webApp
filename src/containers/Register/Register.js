/**
 * Created by hanwencheng on 1/13/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
// it is not used yet
import {initialize} from 'redux-form';
import {RegisterForm} from 'components';
import {register, clearLoginError} from 'redux/modules/auth';
import {Snackbar} from 'material-ui';
import uiStyles from "../../theme/uiStyles";

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

  render(){
    const {loginError} = this.props;
    const styles = require('./Register.scss')

    return (
      <div className="container">
        <div className={styles.register}><h1>注册</h1></div>
          <Helmet title="注册"/>

        <Snackbar
          open={loginError}
          message={loginError}
          autoHideDuration={4000}
          bodyStyle={uiStyles.snackBarStyle}
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