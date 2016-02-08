import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {reduxForm} from 'redux-form';
import {clearLoginError, login} from 'redux/modules/auth';
import loginValidation from './loginValidation';
import {TextField, RaisedButton, Snackbar} from 'material-ui';
import uiStyles from '../../theme/uiStyles';

@connect(
  state => ({
    user: state.auth.user,
    loginError : state.auth.loginError,
    loggingIn : state.auth.loggingIn,
    loginValue: state.auth.loginValue,
  }),
  {clearLoginError, login})

@reduxForm({
  form: 'login',
  fields : ['email', 'password'],
  validate : loginValidation,
})

export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    resetForm : PropTypes.func.isRequired,
    //for login
    loggingIn: PropTypes.bool,
    loginError: PropTypes.string,
    clearLoginError : PropTypes.func.isRequired,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.props.fields.email, this.props.fields.password);
  }

  render() {
    const {
      fields: {email, password},
      user, logout, loggingIn, loginError, resetForm
    } = this.props;
    const styles = require('./Login.scss');

    const inputStyle = uiStyles.inputStyle;
    const buttonStyle = uiStyles.buttonStyle;
    const popupStyle = { color : "#ff0000"};
    const anyError = email.error || password.error;

    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <h1>登录</h1>
        {!user &&
        <div>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <div className={'form-group'}>
              <div>
                <TextField type="text" hintText="邮箱" style={inputStyle}
                           floatingLabelText="邮箱"
                           errorText={email.touched && email.error ? email.error : null}  {...email}
                />
              </div>
            </div>
            <div className={'form-group'}>
              <div>
                <TextField type="password" hintText="密码" style={inputStyle}
                           floatingLabelText="密码"
                           errorText={password.touched && password.error ? password.error : null} {...password}
                />
              </div>
            </div>

            <RaisedButton style style={buttonStyle} onClick={this.handleSubmit} disabled={anyError ? "true" : "false"}>
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
