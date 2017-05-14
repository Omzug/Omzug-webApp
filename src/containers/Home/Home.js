import React, { Component } from 'react';
import { Link } from 'react-router';
import {RaisedButton} from 'material-ui';
import config from '../../config';
import Helmet from 'react-helmet';
import uiStyles from '../../theme/uiStyles';
import imageAddress from '../../constant/imageAddress'
import strings from '../../constant/strings';

export default class Home extends Component {
  componentDidMount(){
    const config0 = {
      origin: 'bottom',
      duration: 1000,
      delay: 300,
      opacity : 0.0,
      distance: '10px',
      scale: 1,
      easing: 'ease',
    }

    const config1 = {
      origin: 'bottom',
      duration: 1000,
      delay: 300,
      distance: '20px',
      scale: 1,
      opacity : 0.0,
      easing: 'ease',
    }

    const config2 = {
      origin: 'bottom',
      duration: 1000,
      delay: 300,
      distance: '20px',
      opacity : 0.0,
      scale: 1,
      easing: 'ease',
    }
    var scrollReveal = require('scrollreveal')
    window.sr = scrollReveal()
    window.sr.reveal(this.refs.reveal0, config0)
    window.sr.reveal(this.refs.reveal1, config1)
    window.sr.reveal(this.refs.reveal2, config2)
  }

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
            <div className={styles.introduction} ref="reveal0">
              <h4>{strings.introduction0}<br /><br />{strings.introductionEn}</h4>
            </div>

          </div>
          <div className={styles.fotoContainer}>
            <div className={styles.foto}>
              <a href="/main">
                {/**<img src={imageAddress.mainImage} />**/}
                <img src={imageAddress.berlinImage} />
              </a>
            </div>
            <div className={styles.startButton}>
              <RaisedButton style={uiStyles.buttonStyleGetStarted} containerElement={<Link to="/main" />} label="开始租房"/>
            </div>
          </div>
        </div>

        <div className={styles.secondContainer}>
          <div className={styles.foto1} >
            <img src={imageAddress.timetable}/>
          </div>
          <div className={styles.text1} ref='reveal1'>
              <div>
                <h4>Design and Details</h4>
              </div>
              <div>
                <p className={styles.responsiveDesign}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {strings.introduction1}
                </p>
            </div>
          </div>
        </div>
        <div className={styles.twoAndHalfContainer}>
            <img className={styles.gearImage} src={imageAddress.gearImage}/>
        </div>
        <div className={styles.thirdContainer}>
          <div className={styles.text2} ref='reveal2'>
            <div>
              <h4> Advanced Technology</h4>
            </div>
            <div>
              <p className={styles.tech} >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {strings.introduction2}</p>
            </div>
          </div>
          <div className={styles.foto2} >
            <img src={imageAddress.technologyImage}/>
          </div>
        </div>

      </div>
    );
  }
}
