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
        <div id="content">
          <div className={styles.containerHome}>
            <div className={styles.mainText}>
              <p>
                Delocate由来自斯图加特大学和柏林白湖艺术学院的学生程翰文和杨鑫玥于2016年在德国创立.
                我们想为在德国留学的中国学生提供一个美观方便的租房平台.
              </p>
              <p>
                Delocate is a website created in 2016 by Hanwen Cheng from Uni Stuttgart
                and Xinyue Yang from Kunsthochschule Berlin-Weissensee. It aims to provide a renting platform for chinese students in Germany.
              </p>
            </div>

            <div className={styles.foto}>
              <img id="h" src={mainImage}/>
            </div>

          </div>
        </div>


        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
            </div>
            <h1>{config.app.title}</h1>

            <h2>{config.app.description}</h2>

            <p>
              <a className={styles.github} href="https://github.com/erikras/react-redux-universal-hot-example"
                 target="_blank">
                <i className="fa fa-github"/> View on Github
              </a>
            </p>
            <GithubButton user="hanwencheng"
                          repo="SeekDev"
                          type="star"
                          width={130}
                          height={30}
                          count large/>
            <GithubButton user="hanwencheng"
                          repo="SeekDev"
                          type="fork"
                          width={130}
                          height={30}
                          count large/>

            <p className={styles.humility}>
              Created and maintained by <a href="https://github.com/hanwencheng" target="_blank">@hanwencheng</a>.
            </p>
          </div>
        </div>

        <div className="container">
          <div className={styles.counterContainer}>
            <CounterButton multireducerKey="counter1"/>
            <CounterButton multireducerKey="counter2"/>
            <CounterButton multireducerKey="counter3"/>
          </div>
        </div>
      </div>
    );
  }
}
