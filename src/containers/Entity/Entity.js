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
import { SubmitForm } from 'components';
import { SubmitTemplate } from 'components';
import { save } from 'redux/modules/submit';

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
    loading: state.entity.loading,
    editing: state.widgets.editing,
  }),
  {entityActions, clearEntity}
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
    loading: PropTypes.bool,
    clearEntity : PropTypes.func.isRequired,

    initializeWithKey: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired
  }

  handleSubmit = () => save(values)
    .then(result => {
      if (result && typeof result.error === 'object') {
        return Promise.reject(result.error);
      }
    })



  render(){
    const {entity, error, loading, clearEntity, editing, load} = this.props;
    const test = false;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Entity.scss');

    return (
      <div>
        <button className="btn btn-primary" onClick={this.handleEdit()}>
          <i className="fa fa-pencil"/> Edit
        </button>

        {test ?
            <SubmitForm onSubmit={this.handleSubmit} />
           :
          <SubmitTemplate />
        }

        <button className="btn btn-success"
                onClick={handleSubmit()}
                disabled={ invalid || submitting}>
          <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save
        </button>


      </div>
    )
  }
}
