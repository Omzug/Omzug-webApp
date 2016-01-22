import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let username = this.refs.username.value
    let password = this.refs.password.value
    this.props.login(username, password);
    username = "";
    password = "";
  }

  render() {
    const {user, logout} = this.props;
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
          </form>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
