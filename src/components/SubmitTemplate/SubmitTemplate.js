/**
 * Created by hanwencheng on 1/22/16.
 */

import React, {Component, PropTypes} from 'react';

import FlatButton from 'material-ui/lib/flat-button';
import Slider from 'nuka-carousel';


export default class SubmitTemplate extends Component {
  static propTypes = {

  }

  render() {
    const styles = require('./SubmitTemplate.scss');
    const image1 = require('./a1.jpg');
    const image2 = require('./b1.jpg');
    const image3 = require('./c1.jpg');

    return (
      <div>
        <Slider>
          <img src={image1}/>
          <img src={image2}/>
          <img src={image3}/>
        </Slider>
        <FlatButton className={styles.button} onClick={this.handleSubmit}><span className="fa fa-pencil"/> Edit</FlatButton>
        <FlatButton className={styles.button} onClick={this.handleSubmit}><span className="fa fa-envelope"/> 联系房主</FlatButton>
        <FlatButton className={styles.button} onClick={this.handleSubmit}><span className="fa fa-share"/> 分享</FlatButton>
        <div className={styles.main}>
        </div>
      </div>
    );
  }
}


