/**
 * Created by hanwencheng on 1/6/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {isLoaded, load as getList, onLocationChange} from 'redux/modules/entities';
import {bindActionCreators} from 'redux';
import connectData from 'helpers/connectData';
import {List} from "components";

import {DropDownMenu, MenuItem,RaisedButton, ThemeManager, ThemeDecorator} from 'material-ui';

import myRawTheme from '../../theme/materialUI.theme';
import cityList from '../../constant/cityList';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    //console.log("after load we get state:", getState().router)
    return dispatch(getList());
  }
}

//@ThemeDecorator(ThemeManager.getMuiTheme(myRawTheme))
@connectData(null, fetchDataDeferred)

@connect(
  state => ({
    entities: state.entities.list,
    error: state.entities.error,
    loading: state.entities.loading,
    loaded: state.entities.loaded,
    locationId : state.entities.locationId
  }),
  {getList, onLocationChange}
  //dispatch => bindActionCreators({getList}, dispatch)
)
export default class Entities extends Component {
  static propTypes = {
    entities : PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    locationId : PropTypes.number,
    loaded :PropTypes.bool,

    getList: PropTypes.func.isRequired,
    onLocationChange: PropTypes.func.isRequired,
  };

  loadCity = (event) => {
    const locationId = this.props.locationId
    if(locationId) {
      //if location is chosen, it starts from 1
      this.props.getList(cityList[locationId]);
    }else{
      this.props.getList();
    }
  }

  dropDownListener = (event, index, value) => {
    this.props.onLocationChange(value);
    this.props.getList(value);
  }

  render() {
    const styles = require('./Entities.scss');
    const {loaded, getList, error, loading, locationId} = this.props;
    const houses = this.props.entities;

    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }

    return (
      <div>
        <div className={styles.listNav}>
          <DropDownMenu value={locationId} onChange={this.dropDownListener} className={styles.dropDown}>
            {/* the value starts from 1 */}
            {cityList.map((city, index) => <MenuItem value={index} key={index} primaryText={cityList[index]}/>)}
          </DropDownMenu>

          <RaisedButton onClick={this.loadCity} style={{lineHeight: "36px" }}><i className={refreshClassName}/> 刷新</RaisedButton>
        </div>

        {loaded &&
        <div className={styles.gridContainer}>
          { houses.length ?
            <List houses={this.props.entities}/>
             :
            <p>这个地区暂时没可用的房源</p>}
        </div>
        }

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
