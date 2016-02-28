/**
 * Created by hanwencheng on 2/27/16.
 */

import React, {PropTypes, Component} from 'react';

export default class MapMarker extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    const styles = require('./MapMarker.scss')
    return (
      <div className={styles.marker}>
        {this.props.text}
      </div>
    );
  }
}