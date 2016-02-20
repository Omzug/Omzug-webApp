import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, div } from 'react-bootstrap';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout, clearLoginError } from 'redux/modules/auth';
import { onAddData } from 'redux/modules/admin';
import { onGetHouseList} from 'redux/modules/entities'
//import { InfoBar } from 'components';
import { pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import config from '../../config';
import FlatButton from 'material-ui/lib/flat-button';
import uiStyles from '../../theme/uiStyles';

// it must be enabled before react 1.0 for material ui

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
    adminLoaded : state.admin.loaded,
    createData : state.entity.createData,
    locationId : state.entities.locationId,
    cityList : state.entities.cityList,
  }),
  {logout, clearLoginError, pushState, onGetHouseList, onAddData})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    createId : PropTypes.string,
    locationId : PropTypes.number,
    adminLoaded : PropTypes.bool,
    cityList :PropTypes.array,

    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    clearLoginError: PropTypes.func.isRequired,
    onGetHouseList : PropTypes.func.isRequired,
    onAddData : PropTypes.func.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  //automatically redirect
  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.clearLoginError();
      this.props.pushState(null, '/main');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState(null, '/');
    }

    if(!this.props.createData && nextProps.createData){
      this.props.pushState(null, '/entities/' + nextProps.createData._id)
      // refresh the main list
      this.props.onGetHouseList(this.props.locationId, this.props.cityList)
      //refresh admin list
      if(this.props.adminLoaded){
        this.props.onAddData(nextProps.createData)
      }
    }
  }

  handleClick = (e) => {
    console.log("click", e);
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
                  <img className={styles.hvrWobbleSkew} src={require('../../../static/favicon.svg')}/>
              </div>
            </LinkContainer>

            <LinkContainer to="/">
              <div className={styles.title}>
                <div className={styles.headerSchrift}>
                  {config.app.title}
                </div>
                {/*<div className={styles.nebenSchrift}>
                  {config.app.description}
                </div>*/}
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

            {/*{user &&
             <LinkContainer to="/logout">
             <FlatButton eventKey={3} onClick={this.handleLogout}>登出</FlatButton>
             </LinkContainer>
             } */}


            {!user &&
            <LinkContainer to="/register">
              <FlatButton style={uiStyles.registerButton} labelStyle={uiStyles.labelStyle} eventKey={4} label="注册"/>
            </LinkContainer>}

          </div>

          <div className={ user ? styles.right : styles.right + " " + styles.noUserRight}>
            {user &&
            <div><span className={rightLi}>您好 <strong className={styles.username}>{user.username}</strong></span></div>}
            {user &&
            <LinkContainer to="/admin">
              <FlatButton eventKey={3}><span className={rightLi}><i className="fa fa-truck fa-lg"/>我的出租</span></FlatButton>
            </LinkContainer>
            }
            {user &&
            <LinkContainer to="/submit">
              <FlatButton eventKey={6}><span className={rightLi}><i className="fa fa-pencil fa-lg"/>发布房屋</span></FlatButton>
            </LinkContainer>
            }
            <LinkContainer to="/about">
              <FlatButton className={styles.aboutUs} eventKey={7}><span className={rightLi}><i className="fa fa-child fa-lg"/>关于我们</span></FlatButton>
            </LinkContainer>
            {user &&
            <LinkContainer to="/logout">
              <FlatButton eventKey={8} onClick={this.handleLogout}><span className={rightLi}><i className="fa fa-sign-out fa-lg" /> 登出</span></FlatButton>
            </LinkContainer>
            }

          </div>
        </div>

        <div className={styles.appContent}>
          {this.props.children}
        </div>

        <div className={styles.bottomText}>
          <p>
            Please feel free to give us some <a href="mailto: softlipaschara@gmail.com">Feedback</a>.<br />

        All rights reserved &copy; 2016 Omzug
          </p>
        </div>
      </div>
    );
  }
}
