import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, div } from 'react-bootstrap';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout, clearLoginError } from 'redux/modules/auth';
//import { InfoBar } from 'components';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import config from '../../config';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FlatButton from 'material-ui/lib/flat-button';

//TODO maybe enable later
//injectTapEventPlugin();

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
  state => ({
    user: state.auth.user,
    createId : state.entity.createId,
  }),
  {logout, clearLoginError, pushState})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    createId : PropTypes.string,

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

    if(!this.props.createId && nextProps.createId){
      this.props.pushState(null, '/entities/' + nextProps.createId)
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
            <LinkContainer to="/">
              <div className={styles.logo}>
                  <img src={require('../../../static/favicon.svg')}/>
              </div>
            </LinkContainer>

            <LinkContainer to="/">
              <div className={styles.title}>
                <div className={styles.headerSchrift}>
                  {config.app.title}
                </div>
                <div className={styles.nebenSchrift}>
                  {config.app.description}
                </div>
              </div>
            </LinkContainer>
            { !config.isDebug &&
            user &&
            <LinkContainer to="/chat">
              <FlatButton eventKey={1}>聊天室</FlatButton>
            </LinkContainer>}

            {!user &&
            <LinkContainer to="/login">
              <FlatButton eventKey={2}>登陆</FlatButton>
            </LinkContainer>}

            {user &&
            <LinkContainer to="/logout">
              <FlatButton eventKey={3} onClick={this.handleLogout}>登出</FlatButton>
            </LinkContainer>
            }

            {!user &&
            <LinkContainer to="/register">
              <FlatButton eventKey={4}>快速注册</FlatButton>
            </LinkContainer>}

          </div>

          <div className={styles.right}>
            {user &&
            <div><span className={rightLi}>您好 <strong className={styles.username}>{user.username}</strong></span></div>}
            {user &&
            <LinkContainer to="/admin">
              <FlatButton eventKey={6}><span className={rightLi}><i className="fa fa-truck fa-lg"/>我的出租</span></FlatButton>
            </LinkContainer>
            }
            {user &&
            <LinkContainer to="/submit">
              <FlatButton eventKey={7}><span className={rightLi}><i className="fa fa-pencil fa-lg"/>发布房屋</span></FlatButton>
            </LinkContainer>
            }
            <LinkContainer to="/about">
              <FlatButton eventKey={8}><span className={rightLi}><i className="fa fa-child fa-lg" />关于我们</span></FlatButton>
            </LinkContainer>
          </div>
        </div>

        <div className={styles.appContent}>
          {this.props.children}
        </div>

        <div className="well text-center">
          Have questions? Ask for help <a href="https://github.com/hanwencheng" target="_blank">
          on Github</a>
        </div>
      </div>
    );
  }
}
