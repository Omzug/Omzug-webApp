/**
 * Created by hanwencheng on 1/6/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getList} from 'redux/modules/entities';
import {bindActionCreators} from 'redux';
import { LinkContainer } from 'react-router-bootstrap';

@connect(
  state => ({
    touched: state.entities.touched,
    number : state.entities.number
  }),
  dispatch => bindActionCreators({getList}, dispatch)
)
export default class Entities extends Component {
  static propTypes = {
    touched: PropTypes.string,
    number : PropTypes.number,
    getList: PropTypes.func.isRequired
  };

  addNumber = (event)=> {
    event.preventDefault();
    this.props.getList(1)
  }

  render() {
    const { touched, number, getList } = this.props;
    return (
      <div>
        <h1>HauseList</h1>
        <button className="" onClick={this.addNumber}>
          whether your button is touched is: { touched }, and click time is { number }
        </button>
        <div className="container">
          <LinkContainer to={`/entities/${number}`}>
            <button>link to entity with number {number}</button>
          </LinkContainer>
        </div>
        <div className="detail">
        </div>
      </div>
    );
  }
}
