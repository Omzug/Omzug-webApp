import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, div } from 'react-bootstrap';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout, clearLoginError } from 'redux/modules/auth';
import { onAddData } from 'redux/modules/admin';
import { onGetHouseList, onGetCityList, onNewSubmit} from 'redux/modules/entities'
import { onGetPostList } from 'redux/modules/posts'
//import { InfoBar } from 'components';
import { push as pushState } from 'redux-router';
import connectData from 'helpers/connectData';
import config from '../../config';
import {FlatButton, FontIcon} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import uiStyles from '../../theme/uiStyles';
import ga from 'react-google-analytics';
const GAInitiailizer = ga.Initializer;
import defaultCityList from '../../constant/cityList';

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
    postCreateData : state.post.createData,
    postLocationId : state.posts.locationId,
  }),
  {logout, clearLoginError, pushState, onGetHouseList, onAddData, onGetCityList, onNewSubmit, onGetPostList})
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
    onGetPostList : PropTypes.func.isRequired,
    onGetCityList : PropTypes.func.isRequired,
    onAddData : PropTypes.func.isRequired,
    onNewSubmit : PropTypes.func.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  //automatically redirect
  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.clearLoginError();
      this.props.pushState('/main');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }

    if(!this.props.createData && nextProps.createData){
      this.props.pushState('/entities/' + nextProps.createData._id)
      // refresh the main list
      //console.log('cityList is', this.props.cityList, 'the searching object is', nextProps.createData.city)
      if(!this.props.cityList.some(function(cityObject){
          return cityObject.city === nextProps.createData.city
        })){
        //console.log('cannot find the submit city , now refresh the list')
        this.props.onNewSubmit(null);//also change locationId here
      }else{
        console.log('find the submit city , now only refresh the current list')
        this.props.onGetHouseList(this.props.locationId, this.props.cityList)
      }

      //refresh admin list
      if(this.props.adminLoaded){
        this.props.onAddData(nextProps.createData)
      }
    }

    if(!this.props.postCreateData && nextProps.postCreateData){
      this.props.pushState('/posts/' + nextProps.postCreateData._id)

      this.props.onGetPostList(this.props.postLocationId, defaultCityList)

      //TODO refresh admin list
      //if(this.props.adminLoaded){
      //  this.props.onAddData(nextProps.createData)
      //}
    }
  }

  handleClick = (e) => {
    //console.log("click", e);
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const {user} = this.props;
    const styles = require('./App.scss');
    const rightLi = styles.links + " " + styles.hvrBuzzOut;
    ga('create', 'UA-60973146-2', 'auto');
    ga('send', 'pageview');

    return (
      <MuiThemeProvider>
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <GAInitiailizer />
        <div className={styles.navbar}>
          <div className={styles.left}>
            <div className={styles.logoContainer}>
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
                </div>
              </LinkContainer>
            </div>

            <div className={styles.buttonContainer}>
              {!user &&
              <FlatButton style={uiStyles.fullHeightButton} containerElement={<Link to="/login" />} label="登录"/>
              }

              {!user &&
              <FlatButton labelStyle={uiStyles.registerButton} label="注册" style={uiStyles.fullHeightButton}
                          containerElement={<Link to="/register" />}/>
              }

              <FlatButton containerElement={<Link to="/about" />} style={uiStyles.fullHeightButton}
                          label="关于我们"/>

              {/*{user &&
              <FlatButton containerElement={<Link to="/chat" />} label="聊天室"/>
              }*/}

              {user &&
              <FlatButton containerElement={<Link to="/main" />}
                          style={uiStyles.fullHeightButton} label="出租 "/>
              }

              {user &&
              <FlatButton containerElement={<Link to="/posts" />}
                          style={uiStyles.fullHeightButton} label="求租 "/>
              }

            </div>

          </div>
          {user &&
          <div className={ user ? styles.right : styles.right + " " + styles.noUserRight}>
            <div className={styles.welcome}><span className={rightLi}><i className="fa fa-child"/> <strong className={styles.username}>{user.username}</strong></span></div>
            <FlatButton style={uiStyles.fullHeightButton} containerElement={<Link to="/admin" />}>
              <i className="fa fa-truck fa-lg"/>我的出租
            </FlatButton>
            <FlatButton style={uiStyles.fullHeightButton} containerElement={<Link to="/submit" />}>
              <i className="fa fa-pencil fa-lg"/>发布房屋
            </FlatButton>
            <FlatButton style={uiStyles.fullHeightButton} containerElement={<Link to="/favorite" />}>
              <i className="fa fa-pencil fa-lg"/>我的收藏
            </FlatButton>
            <FlatButton onClick={this.handleLogout} style={uiStyles.fullHeightButton} containerElement={<Link to="/logout" />}>
              <i className="fa fa-sign-out fa-lg" /> 登出
            </FlatButton>
          </div>}
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
      </MuiThemeProvider>
    );
  }
}
