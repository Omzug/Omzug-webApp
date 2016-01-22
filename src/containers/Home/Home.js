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
            <h5>{config.app.description}</h5>
            <p className={styles.humility}>
              Created and maintained by <a href="https://github.com/hanwencheng" target="_blank">@hanwencheng</a>.
            </p>
          </div>

          <div className={styles.foto}>
            <img id="h" src={mainImage}/>
          </div>
        </div>
      </div>
    );
  }
}
