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
    entities: state.entities.data,
    error: state.entities.error,
    loading: state.entities.loading
  }),
  {getList}
  //dispatch => bindActionCreators({getList}, dispatch)
)
export default class Entities extends Component {
  static propTypes = {
    data : PropTypes.object,
    getList: PropTypes.func.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool,
  };

  addNumber = (event)=> {
    event.preventDefault();
    this.props.getList()
  }

  render() {
    const { data, getList, error, loading } = this.props;
    console.log('entities are', data)
    return (
      <div>
        <h1>HauseList</h1>
        <button className="" onClick={getList}>
        </button>
        <div className="container">
          {data && data.list && data.list.map((unit, index)=>
          <p key={index}>element is {unit} </p>
        )}
        </div>
        <div className="container">
          {data && data.number &&
          <LinkContainer to={`/entities/${data.number}`}>
            <button>link to entity with number {data.number}</button>
          </LinkContainer>}
        </div>
        <div className="detail">
        </div>
        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true">sorry</span>
          {' '}
          {error}
        </div>}
      </div>
    );
  }
}
