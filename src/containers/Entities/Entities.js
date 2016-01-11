/**
 * Created by hanwencheng on 1/6/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {isLoaded, load as getList} from 'redux/modules/entities';
import {bindActionCreators} from 'redux';
import { LinkContainer } from 'react-router-bootstrap';
import connectData from 'helpers/connectData';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    console.log("after load we get state:", getState().router)
    return dispatch(getList());
  }
}

@connectData(null, fetchDataDeferred)

@connect(
  state => ({
    entities: state.entities.data.list,
    number : state.entities.data.number
  }),
  {getList}
  //dispatch => bindActionCreators({getList}, dispatch)
)
export default class Entities extends Component {
  static propTypes = {
    entities: PropTypes.array,
    number : PropTypes.number,
    getList: PropTypes.func.isRequired
  };

  addNumber = (event)=> {
    event.preventDefault();
    this.props.getList()
  }

  render() {
    const { entities, number, getList } = this.props;
    console.log('entities are', entities)
    return (
      <div>
        <h1>HauseList</h1>
        <button className="" onClick={getList}>
        </button>
        <div className="container">
          {entities && entities.map((unit, index)=>
          <p key={index}>element is {unit} </p>
        )}
        </div>
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
