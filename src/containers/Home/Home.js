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
            <p>
              Delocate由来自斯图加特大学和柏林白湖艺术学院的学生程翰文和杨鑫玥于2016年在德国创立.
              我们想为在德国留学的中国学生提供一个美观方便的租房平台.
            </p>
            <p>
              Delocate is a website created in 2016 by Hanwen Cheng from Uni Stuttgart
              and Xinyue Yang from Kunsthochschule Berlin-Weissensee. It aims to provide a renting platform for chinese students in Germany.
            </p>
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
