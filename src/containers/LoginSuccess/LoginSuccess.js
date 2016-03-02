import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';

@connect(
    state => ({
      user: state.auth.user
    }),
    authActions)
export default
class LoginSuccess extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./LoginSuccess.scss');
    return (user &&
      <div className={styles.container}>
        <h1>Login Success</h1>

        <div className={styles.greeting}>
          <p>Hello,{user.username}! 欢迎来到Omzug! You have just successfully logged in, How exciting it is!
          </p>

          <p>you have the following information here: </p>
          <ul>
            { user._id &&
            <li> id : {user._id}</li>}
            { user.email &&
            <li> email : {user.email}</li>}
            <li> createdAt : {user.createdAt.toString()}</li>
            <li> updatedAt : {user.updatedAt.toString()}</li>
          </ul>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
      </div>
    );
  }
}
