/**
 * Created by hanwencheng on 1/22/16.
 */

import React, {Component, PropTypes} from 'react';

// Material UI components
import FlatButton from 'material-ui/lib/flat-button';

export default class SubmitTemplate extends Component {
  static propTypes = {

  }


  render() {
    const styles = require('./SubmitTemplate.scss');
    return (
      <div className={styles.main}>
        <FlatButton onClick={this.handleSubmit}><span className="fa fa-pencil"/> Edit</FlatButton>
        <FlatButton className={styles.button} onClick={this.handleSubmit}><span className="fa fa-envelop-o"/> 联系房主</FlatButton>
        <FlatButton className={styles.button} onClick={this.handleSubmit}><span className="fa fa-envelop-o"/> 分享</FlatButton>
      </div>
    );
  }
}


