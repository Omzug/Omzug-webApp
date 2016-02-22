import React, { Component } from 'react';
import { Link } from 'react-router';
import { CounterButton, GithubButton } from 'components';
import config from '../../config';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const mainImage = require('./main.gif');

    return (
      <div className={styles.home}>
        <Helmet title="主页"/>
        <div className={styles.container}>
          <div className={styles.description}>
            {/*<div className={styles.title}><h4></h4></div>*/}
            <div className={styles.introduction}><h4>{config.app.introduction}<br /><br />
              {config.app.introductionEn}</h4></div>
            {/*<div><img className={styles.bulb} src="http://www.endlessicons.com/wp-content/uploads/2012/09/light-bulb-icon-614x460.png"/></div>*/}
          </div>

          <div className={styles.foto}>
            <img id="h" src="https://49.media.tumblr.com/936d938e81a488e380316352a6c3eefe/tumblr_o2tghkrmXz1qkfs2lo1_1280.gif"/>
          </div>
        </div>
      </div>
    );
  }
}
