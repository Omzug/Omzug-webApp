/**
 * Created by hanwencheng on 1/8/16.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {isLoaded, load as onLoad, clear as onClear, changeLocation as onChangeLocation} from "redux/modules/entity"
import connectData from 'helpers/connectData';
import { SubmitForm } from 'components';
import { SubmitTemplate } from 'components';

import FlatButton from 'material-ui/lib/flat-button';


function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    console.log("nothing load, after load we get state:")
    return dispatch(onLoad(getState().router.params.entityId));
  }
}

//get the params only after page loaded
function checkState(getState, dispatch){
  console.log('before load we get state: ')
}

@connectData(
  checkState, fetchDataDeferred
)
@connect(
  state => ({
    entity: state.entity.data,
    error: state.entity.error,
    loading: state.entity.loading,
    editing: state.entity.editing,
  }),
  {onLoad, onClear}
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
    editing: PropTypes.bool,

    //editStart: PropTypes.func.isRequired,
    onClear : PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired
  }

  handleSubmit = () => {
    console.log("submit now ")
  }
    //save(values)
    //.then(result => {
    //  if (result && typeof result.error === 'object') {
    //    return Promise.reject(result.error);
    //  }
    //})

  render(){
    const {entity, error, loading, onClear, editing, onLoad} = this.props;

    // for test case
    const test = false;
    const invalid = true;
    const submitting = false;

    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Entity.scss');

    return (
      <div>
        <button className="btn btn-primary" >

        </button>
        {editing ?
            <SubmitForm onSubmit={this.handleSubmit} />
           :
          <SubmitTemplate />
        }
      </div>
    )
  }
}
