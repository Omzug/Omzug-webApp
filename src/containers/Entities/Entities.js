/**
 * Created by hanwencheng on 1/6/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {isLoaded, load as getList, onLocationChange} from 'redux/modules/entities';
import {bindActionCreators} from 'redux';
import { LinkContainer } from 'react-router-bootstrap';
import connectData from 'helpers/connectData';

import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';


import myRawTheme from '../../theme/materialUI.theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    console.log("after load we get state:", getState().router)
    return dispatch(getList());
  }
}

//@ThemeDecorator(ThemeManager.getMuiTheme(myRawTheme))
@connectData(null, fetchDataDeferred)

@connect(
  state => ({
    entities: state.entities.data,
    error: state.entities.error,
    loading: state.entities.loading,
    locationId : state.entities.locationId
  }),
  {getList, onLocationChange}
  //dispatch => bindActionCreators({getList}, dispatch)
)
export default class Entities extends Component {
  static propTypes = {
    data : PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool,
    locationId : PropTypes.number,

    getList: PropTypes.func.isRequired,
    onLocationChange: PropTypes.func.isRequired,
  };

  addNumber = (event) => {
    event.preventDefault();
    this.props.getList()
  }

  render() {
    const { data, getList, error, loading, locationId, onLocationChange } = this.props;
    console.log('entities are', data)
    return (
      <div>
        <h1>HauseList</h1>

        <DropDownMenu value={locationId} onChange={onLocationChange}>
          <MenuItem value={1} primaryText="Berlin"/>
          <MenuItem value={2} primaryText="Stuttgart"/>
          <MenuItem value={3} primaryText="Munich"/>
          <MenuItem value={4} primaryText="Hamburg"/>
          <MenuItem value={5} primaryText="NordWestfalen"/>
        </DropDownMenu>

        <RaisedButton label="My Button"
                      onClick={this.addNumber} />

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
            </LinkContainer>
          }
        </div>
        <div className="detail"></div>
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
