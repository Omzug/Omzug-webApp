import React, { Component } from 'react';
import { Link } from 'react-router';
import {RaisedButton} from 'material-ui';
import config from '../../config';
import Helmet from 'react-helmet';
import uiStyles from '../../theme/uiStyles';
import imageAddress from '../../constant/imageAddress'

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const mainImage = require('./main.gif');

    return (
      <div className={styles.home}>
        <Helmet title="首页"/>
        <div className={styles.container}>
          <div className={styles.description}>
            {/*<div className={styles.title}><h4></h4></div>*/}
            <div className={styles.introduction}><h4>{config.app.introduction}<br /><br />
              {config.app.introductionEn}</h4></div>

          </div>
          <div className={styles.fotoContainer}>
            <div className={styles.foto}>
              <a href="/main"><img src={imageAddress.mainImage} /></a>
            </div>
            <div className={styles.startButton}>
              <RaisedButton style={uiStyles.buttonStyleGetStarted} linkButton={true} containerElement={<Link to="/main" />} label="Get started"/>
            </div>
          </div>
        </div>

        <div className={styles.secondContainer}>
          <div className={styles.foto1}>
            <img src={imageAddress.timetable}/>
          </div>
          <div className={styles.text1}>
              <div>
                <h4>Design and Details</h4>
              </div>
              <div>
                <p className={styles.responsiveDesign}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 简洁的设计和细节的打磨，我们的目标是创造自然、直觉的用户体验。
                </p>
            </div>
          </div>
        </div>
        <div className={styles.thirdContainer}>
          <div className={styles.text2}>
            <div>
              <h4><img src={imageAddress.bulbImage}/> Advanced Technology</h4>
            </div>
            <div>
              <p className={styles.tech}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                采用最新的互联网技术,从零开始搭建,为大家打造一个纯净、简单、易用的信息平台。</p>
            </div>
          </div>
          <div className={styles.foto2}>
            <img src={imageAddress.technologyImage}/>
          </div>
        </div>

      </div>
    );
  }
}
