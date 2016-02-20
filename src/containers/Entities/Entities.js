/**
 * Created by hanwencheng on 1/6/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {isLoaded, load as getList, onLocationChange, onAppendList, onDeleteHouse,onDisableAppend, onGetCityList, onInit} from 'redux/modules/entities';
import {bindActionCreators} from 'redux';
import connectData from 'helpers/connectData';
import {List} from "components";
import config from '../../config';
import Select from 'react-select';
import {DropDownMenu, MenuItem,RaisedButton, ThemeManager, ThemeDecorator} from 'material-ui';

import myRawTheme from '../../theme/materialUI.theme';
import cityList from '../../constant/cityList';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    //console.log("after load we get state:", getState().router)
    return dispatch(onInit());
  }

}

//@ThemeDecorator(ThemeManager.getMuiTheme(myRawTheme))
@connectData(null, fetchDataDeferred)

@connect(
  state => ({
    isEnd : state.entities.isEnd,
    entities: state.entities.list,
    error: state.entities.error,
    loading: state.entities.loading,
    loaded: state.entities.loaded,
    locationId : state.entities.locationId,
    cityList : state.entities.cityList,
  }),
  {getList, onLocationChange, onAppendList, onDeleteHouse, onDisableAppend, onGetCityList}
  //dispatch => bindActionCreators({getList}, dispatch)
)
export default class Entities extends Component {
  static propTypes = {
    entities : PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    locationId : PropTypes.number,
    loaded :PropTypes.bool,
    isEnd : PropTypes.bool,
    cityList : PropTypes.array,

    onDisableAppend : PropTypes.func.isRequired,
    onDeleteHouse : PropTypes.func.isRequired,
    getList: PropTypes.func.isRequired,
    onLocationChange: PropTypes.func.isRequired,
    onAppendList : PropTypes.func.isRequired,
    onGetCityList : PropTypes.func.isRequired,
  };

  loadCity = (event) => {
    event.preventDefault()
    if(this.props.locationId && this.props.locationId <= cityList.length) {
      this.props.getList(cityList[locationId].toLowerCase());
    }else{
      this.props.getList();
    }
  }

  onSelectChange = (value) => {
    //value is number
    if(value === ""){
      value = null
    }
    this.props.onLocationChange(value);
    console.log('now the value of select is',value)
    //if(value && value <= cityList.length) {
    //  this.props.getList(this.props.cityList[value].toLowerCase());
    //}else{
    //  this.props.getList();
    //}
  }


  handleScroll = (event) => {
    var listBody = event.srcElement.body;
    if(window.innerHeight + listBody.scrollTop >= listBody.scrollHeight - 20){
      //temporary disable append util we get result
      if(!this.props.loading && !this.props.isEnd){
        this.props.onDisableAppend();
        console.log('now appending to list')
        if(this.props.locationId && this.props.locationId <= cityList.length) {
          this.props.onAppendList(cityList[locationId].toLowerCase(), this.props.entities.length);
        }else{
          this.props.onAppendList(null,this.props.entities.length);
        }
      }
    }
  }
  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    require('../../theme/react-select.css')
    const styles = require('./Entities.scss');
    const {loaded, getList, error, loading, locationId} = this.props;
    const houses = this.props.entities;//TODO

    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }

    return (
      <div>
        <div className={styles.listNav}>
          <div className={styles.select}>
            <Select
              name="selectCity"
              options={this.props.cityList}
              value={locationId === null ? "" : this.props.cityList[locationId].label}
              onChange={this.onSelectChange}
              noResultsText={"数据库里暂无这里的房屋信息"}
              placeholder={"选择您所在的城市"}
            />
          </div>

          <RaisedButton onClick={this.loadCity} style={{lineHeight: "36px" }}><i className={refreshClassName}/> 刷新</RaisedButton>
        </div>

        {loaded &&
        <div className={styles.gridContainer}>
          { houses.length ?
            <List houses={this.props.entities} onDeleteHouse={this.props.onDeleteHouse}/>
             :
            <div className={styles.regionNoSource}><p>Ooops! 这个地区暂时没可用的房源!</p></div>}
        </div>
        }

        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true">sorry</span>
          {' '}
          {error}
        </div>}

        {loading &&
        <div className={styles.loading}>
          <p className={styles.loadingText}> Loading Now</p>
          <p><i className="fa fa-spin fa-refresh fa-4x"/></p>
        </div>}
      </div>
    );
  }
}
