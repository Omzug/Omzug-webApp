import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {clearLoginError} from 'redux/modules/auth';
import {TextField, RaisedButton, Snackbar} from 'material-ui';
import uiStyles from '../../theme/uiStyles';

@connect(
  state => ({
    user: state.auth.user,
    loginError : state.auth.loginError,
    loggingIn : state.auth.loggingIn,
  }),
  {clearLoginError})
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    //for login
    loggingIn: PropTypes.bool,
    loginError: PropTypes.string,
    clearLoginError : PropTypes.func.isRequired,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let username = this.refs.username.value
    let password = this.refs.password.value
    if(username === "" || password === "") {
      return;
    }
    console.log("the login user is", username)
    this.props.login(username, password);
    username = "";
    password = "";
  }

  render() {
    const {user, logout, loggingIn, loginError} = this.props;
    const styles = require('./Login.scss');
    const loginForm = styles.login + " form-group"

    const inputStyle = uiStyles.inputStyle;
    const buttonStyle = uiStyles.buttonStyle;
    const popupStyle = { color : "#ff0000"}

    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <h1>登录</h1>
        {!user &&
        <div>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <div className={'form-group'}>
              <label>用户名</label>
              <div>
                <TextField type="text" hintText="用户名" ref="username" style={inputStyle}/>
              </div>
            </div>
            <div className={'form-group'}>
              <label>密码</label>
              <div>
                <TextField type="text" hintText="密码" ref="password" style={inputStyle}/>
              </div>
            </div>

            <RaisedButton style style={buttonStyle} onClick={this.handleSubmit}>
              {loggingIn ?
                <span className="fa fa-spin fa-refresh"/>
                :
                <span>Los!</span>
              }
            </RaisedButton>

            <Snackbar
              open={loginError}
              message={loginError}
              autoHideDuration={4000}
              bodyStyle={popupStyle}
              onRequestClose={(reason) => {
                this.props.clearLoginError();
              }}
            />
            {loginError && <p className={ "bg-danger " + styles.error}><strong>{loginError}</strong></p>}
          </form>
        </div>
        }
      </div>
    );
  }
}
