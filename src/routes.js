import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {pushState} from 'redux-router'
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {clear as clearEntity} from 'redux/modules/entity';
import config from './config.js'
import {
    App,
    Chat,
    Home,
    Widgets,
    About,
    Login,
    LoginSuccess,
    Survey,
    NotFound,
    Entities,
    Entity,
    Register,
    Submit
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  const checkUser = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/main');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  }

  const requireDev = (nextState, replaceState, cb) => {
    if(config.isDebug){
      cb()
    }
  }

  const logNextState = (nextState, replaceState, cb) => {
    const entityNow = store.getState().entity;
    console.log('environment is', config.isDebug)
    console.log('next state is', nextState.params, typeof nextState.params.entityId,
      "\n loadedId :", entityNow.loadedId, typeof entityNow.loadedId)
    //only clear cache if the id is not the same as before
    if(entityNow.loaded && entityNow.loadedId !== nextState.params.entityId) {
      console.log('should be cleared')
      store.dispatch(clearEntity())
    }
    console.log('should not be cleared, keep old')
    cb();
  };


  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home} /* onEnter={checkUser} *//>


      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="chat" component={Chat}/>
        <Route path="loginSuccess" component={LoginSuccess}/>
      </Route>

      { /* Routes */ }
      <Route path="about" component={About}/>
      <Route path="main" component={Entities}/>
      <Route path="entities/:entityId" component={Entity} onEnter={logNextState}/>
      <Route path="login" component={Login}/>
      <Route path="register" component={Register}/>
      <Route path="submit" component={Submit}/>
      <Route path="survey" component={Survey}/>
      <Route path="widgets" component={Widgets}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
