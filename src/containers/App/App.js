import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, li } from 'react-bootstrap';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { InfoBar } from 'components';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import config from '../../config';


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
  {logout, pushState})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
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
    const rightLi = styles.links + " " +  styles.hvrBuzzOut;


    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <div className={styles.navbar}>
          <div className={styles.left}>
            <ul>
              <li className={styles.logo}>
                <a href="/" target="_blank">
                  <span className={styles.headerschrift + " " + styles.hvrFloatShadow}>Delocate</span>
                </a>
              </li>
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
              <LinkContainer to="/survey">
                <li eventKey={3}>Survey</li>
              </LinkContainer>

              <LinkContainer to="/register">
                <li eventKey={4}>注册</li>
              </LinkContainer>

              <LinkContainer to="/submit">
                <li eventKey={9}>提交房屋</li>
              </LinkContainer>

              {!config.isDebug &&
              <LinkContainer to="/about">
                <li eventKey={5}>关于我们</li>
              </LinkContainer>
              }

              {!config.isDebug &&
              <LinkContainer to="/main">
                <li eventKey={6}>房屋们</li>
              </LinkContainer>
              }

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
              <li><span className={rightLi}><i className={styles.loggedInMessage}/>Logged in as <strong>{user.name}</strong></span></li>}
              {user &&
              <li><span className={rightLi}><i className="fa fa-pencil fa-lg" /><a href="#">管理账号</a></span></li>}
              {user &&
              <li><span className={rightLi}><i className="fa fa-truck fa-lg" /><a href="rent/rent.html"> 我要出租</a></span></li>}
              <li><span className={rightLi}><i className="fa fa-child fa-lg" />关于我们</span></li>
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
