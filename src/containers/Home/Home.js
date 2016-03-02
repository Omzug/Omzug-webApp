import React, { Component } from 'react';
import { Link } from 'react-router';
import {RaisedButton} from 'material-ui';
import config from '../../config';
import Helmet from 'react-helmet';

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
            <div className={styles.startButton}>
              <RaisedButton linkButton={true} containerElement={<Link to="/main" />} label="Get Started"/>
            </div>
            {/*<div><img className={styles.bulb} src="http://www.endlessicons.com/wp-content/uploads/2012/09/light-bulb-icon-614x460.png"/></div>*/}
          </div>

          <div className={styles.foto}>
            <img id="h" src="https://49.media.tumblr.com/936d938e81a488e380316352a6c3eefe/tumblr_o2tghkrmXz1qkfs2lo1_1280.gif"/>
          </div>
        </div>

        <div className={styles.secondContainer}>
          <div className={styles.foto1}>
            <img src="https://41.media.tumblr.com/ecc9d7da97c423c39d5442e5875c224f/tumblr_o3f26ziBSs1vn5ujpo1_1280.png"/>
          </div>
          <div className={styles.text1}>
              <div>
                <h4>Responsive Webdesign</h4>
              </div>
              <div>
                <p className={styles.responsiveDesign}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  短期回国出租,或者是寻找长期学生宿舍,还是毕业后换新住所,都可以在这里寻找
                </p>
            </div>
          </div>
        </div>
        <div className={styles.thirdContainer}>
          <div className={styles.text2}>
            <div>
              <h4>Advanced Technology</h4>
            </div>
            <div>
              <p className={styles.tech}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                采用最新最热门的互联网技术,从零开始搭建,打造一个纯净,简单,易用的信息平台</p>
            </div>
          </div>
          <div className={styles.foto2}>
            <img src="https://s3.eu-central-1.amazonaws.com/omzug.com/gif/iconsnew.png"/>
          </div>
        </div>

      </div>
    );
  }
}
