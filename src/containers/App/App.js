import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, li } from 'react-bootstrap';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout, clearLoginError } from 'redux/modules/auth';
import { InfoBar } from 'components';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import config from '../../config';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

//load authentication data when loaded
function fetchData(getState, dispatch) {
  const promises = [];
  if (!isInfoLoaded(getState())) {
    promises.push(dispatch(loadInfo()));
  }
  if (!isAuthLoaded(getState())) {
    promises.push(dispatch(loadAuth()));
  }
  return Promise.all(promises);
}

@connectData(fetchData)
@connect(
  state => ({user: state.auth.user}),
  {logout, clearLoginError, pushState})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    clearLoginError: PropTypes.func.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  //automatically redirect
  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.clearLoginError();
      this.props.pushState(null, '/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState(null, '/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const {user} = this.props;
    const styles = require('./App.scss');
    const rightLi = styles.links + " " + styles.hvrBuzzOut;


    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <div className={styles.navbar}>
          <div className={styles.left}>
            <ul>
              <LinkContainer to="/">
              <li className={styles.logo}>
                  <span className={styles.headerschrift + " " + styles.hvrFloatShadow}>Delocate</span>
              </li>
              </LinkContainer>
              <li>
                <span className={styles.nebenschrift + " " + styles.hvrFloatShadow}>
                  {config.app.description}
                </span>
              </li>
              {!config.isDebug &&
              user &&
              <LinkContainer to="/chat">
                <li eventKey={1}>Chat</li>
              </LinkContainer>}
              {!config.isDebug &&
              <LinkContainer to="/widgets">
                <li eventKey={2}>Widgets</li>
              </LinkContainer>
              }
              {!config.isDebug &&
              <LinkContainer to="/survey">
                <li eventKey={3}>Survey</li>
              </LinkContainer>}

              {!user &&
              <LinkContainer to="/register">
                <li eventKey={4}>快速注册</li>
              </LinkContainer>}

              <LinkContainer to="/submit">
                <li eventKey={9}>提交房屋</li>
              </LinkContainer>

              {!config.isDebug &&
              <LinkContainer to="/main">
                <li eventKey={6}>房屋们</li>
              </LinkContainer>
              }

              <LinkContainer to="/entities/3">
                <li eventKey={5}>某房屋</li>
              </LinkContainer>

              {!user &&
              <LinkContainer to="/login">
                <li eventKey={7}>登陆</li>
              </LinkContainer>}
              {user &&
              <LinkContainer to="/logout">
                <li eventKey={8} className="logout-link" onClick={this.handleLogout}>
                  登出
                </li>
              </LinkContainer>
              }
            </ul>
          </div>

          <div className={styles.right}>
            <ul>
              {user &&
              <li><span className={rightLi}><i className={styles.loggedInMessage}/>Logged in as <strong>{user.username}</strong></span></li>}
              {user &&
              <li><span className={rightLi}><i className="fa fa-pencil fa-lg" /><a href="#">管理账号</a></span></li>}
              {user &&
              <li><span className={rightLi}><i className="fa fa-truck fa-lg" /><a href="rent/rent.html"> 我要出租</a></span></li>}
              <LinkContainer to="/about">
                <li><span className={rightLi}><i className="fa fa-child fa-lg" />关于我们</span></li>
              </LinkContainer>
              <li><span className={rightLi}><i className="fa fa-github"/></span></li>
            </ul>
          </div>
        </div>

        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <InfoBar/>

        <div className="well text-center">
          Have questions? Ask for help <a href="https://github.com/hanwencheng" target="_blank">
          on Github</a>
        </div>
      </div>
    );
  }
}
