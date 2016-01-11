/**
 * Created by hanwencheng on 1/8/16.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getList} from 'redux/modules/entities';
import {bindActionCreators} from 'redux';
import {isLoaded, load as loadEntity, clear as clearEntity} from "redux/modules/entity"
import * as entityActions from 'redux/modules/entity';
import connectData from 'helpers/connectData';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    console.log("after load we get state:", getState().router)
    return dispatch(loadEntity(getState().router.params.entityId));
  }
}

//get the params only after page loaded
function checkState(getState, dispatch){
  console.log('before load we get state: ', getState().router)
}

@connectData(checkState, fetchDataDeferred)
@connect(
  state => ({
    entity: state.entity.data,
    error: state.entity.error,
    loading: state.entity.loading
  }),
  {entityActions}
)
export default class Entity extends Component {
  //componentDidMount() {
  //  this.setState({
  //    // route components are rendered with useful information, like URL params
  //  })
  //}
  static propTypes = {
    entity: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool
  }

  render(){
    const {entity, error, loading} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }

    return (
      <div>
        <button className={refreshClassName}>click to refresh</button>
      { entity && entity.entities.length ?
        <div>
          entity is not empty
          {entity.entities.map((hause, i) =>
            hause.indexOf("2") >= 0  ?
              <div key={i}>number 2 with hause: {hause}</div>
              :
              <div key={i}>this is not number2 with hause: {hause}</div>
          )}
        </div>
        :
        <div>entity is empty</div>
      }
      </div>
    )
  }
}
