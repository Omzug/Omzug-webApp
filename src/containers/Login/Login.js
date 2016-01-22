import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({
    user: state.auth.user,
    loginError : state.auth.loginError,
    //loggingIn : state.auth.loggingIn,
  }),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    //for login
    loggingIn: PropTypes.bool,
    loginError: PropTypes.string,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let username = this.refs.username.value
    let password = this.refs.password.value
    if(username === "" || password === "") {
      return;
    }
    this.props.login(username, password);
    username = "";
    password = "";
  }

  render() {
    const {user, logout, loggingIn, loginError} = this.props;
    const styles = require('./Login.scss');
    const loginForm = styles.login + " form-group"

    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <h1>Login</h1>
        {!user &&
        <div>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <div className={styles.loginForm}>
              <input type="text" ref="username" placeholder="用户名" className="form-control"/>
            </div>

            <div className={styles.loginForm}>
              <input type="password" ref="password" className="form-control" placeholder="这里输入密码"/>
            </div>

            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>
              Los!
            </button>

            {loginError && <p className={ "bg-danger " + styles.error}><strong>{loginError}</strong></p>}
          </form>
        </div>
        }
      </div>
    );
  }
}
