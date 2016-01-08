/**
 * Created by hanwencheng on 1/6/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getList} from 'redux/modules/entities';
import {bindActionCreators} from 'redux';

@connect(
  state => ({
    touched: state.list.touched,
    number : state.list.number
  }),
  dispatch => bindActionCreators({getList}, dispatch)
)
export default class Entities extends Component {
  static propTypes = {
    touched: PropTypes.string,
    number : PropTypes.number,
    getList: PropTypes.func.isRequired
  };

  render() {
    const { touched, number, getList } = this.props;
    return (
      <div>
        <h1>HauseList</h1>
        <button className="" onClick={getList(1)}
        >
          whether your button is touched is: { touched }, and click time is { number }
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
