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
import imageAddress from '../../constant/imageAddress'

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
      <div className={styles.registerPage}>
        <Helmet title="注册"/>
        <Snackbar
          open={loginError != null}
          message={loginError != null ? loginError : ""}
          autoHideDuration={4000}
          bodyStyle={uiStyles.snackBarStyleRed}
          onRequestClose={(reason) => {
            this.props.clearLoginError();
          }}
        />

        <div className={styles.container}>
        <div className={styles.registerForm}>
          <div className={styles.registerTitle}><h1>注册</h1></div>
          <RegisterForm onSubmit={this.handleSubmit}/>
        </div>


        <div className ={styles.registerPic}>
          <img src={imageAddress.registerImage}/></div>
        </div>
      </div>
    )
  }

}