/**
 * Created by hanwencheng on 1/6/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getList} from 'redux/modules/list';
import {bindActionCreators} from 'redux';

@connect(
  state => ({ list: state.list}),
  dispatch => bindActionCreators(getList, dispatch)
)
export default class Entities extends Component {
  static propTypes = {
    list: PropTypes.object,
    getList: PropTypes.func.isRequired
  };

  render() {
    const { getList, list } = this.props; // eslint-disable-line no-shadow
    return (
      <div>
        <h1>HauseList</h1>
        <button className="" onClick={getList}>
          You get list is {list}
        </button>
        <div className="container">
          <div>
            {/* use Link to route around the app */}
            {/* this.state.entities.map(entity => (
             <Link to={`/user/${user.id}`}>{user.name}</Link>
             )) */            }

          </div>
        </div>
        <div className="detail">
        </div>
      </div>
    );
  }
}
