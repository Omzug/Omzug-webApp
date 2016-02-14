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
        <Helmet title="Home"/>
        <div className={styles.container}>
          <div className={styles.description}>
            <h4>{config.app.title}</h4>
            <h5>{config.app.introduction}</h5>
          </div>

          <div className={styles.foto}>
            <img id="h" src={mainImage}/>
          </div>
        </div>
      </div>
    );
  }
}
