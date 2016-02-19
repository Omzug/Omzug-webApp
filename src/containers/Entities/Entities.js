/**
 * Created by hanwencheng on 1/6/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {isLoaded, load as getList, onLocationChange, onAppendList, onDeleteHouse,onDisableAppend} from 'redux/modules/entities';
import {bindActionCreators} from 'redux';
import connectData from 'helpers/connectData';
import {List} from "components";
import config from '../../config';

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
    isEnd : state.entities.isEnd,
    entities: state.entities.list,
    error: state.entities.error,
    loading: state.entities.loading,
    loaded: state.entities.loaded,
    locationId : state.entities.locationId
  }),
  {getList, onLocationChange, onAppendList, onDeleteHouse, onDisableAppend}
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

    onDisableAppend : PropTypes.func.isRequired,
    onDeleteHouse : PropTypes.func.isRequired,
    getList: PropTypes.func.isRequired,
    onLocationChange: PropTypes.func.isRequired,
    onAppendList : PropTypes.func.isRequired,
  };

  loadCity = (event) => {
    event.preventDefault()
    if(this.props.locationId && this.props.locationId <= cityList.length) {
      this.props.getList(cityList[locationId].toLowerCase());
    }else{
      this.props.getList();
    }
  }

  dropDownListener = (event, index, value) => {
    this.props.onLocationChange(value);
    if(value && value <= cityList.length) {
      this.props.getList(cityList[value].toLowerCase());
    }else{
      this.props.getList();
    }
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
          <DropDownMenu value={locationId} onChange={this.dropDownListener} className={styles.dropDown}>
            {/* the value starts from 1 */}
            {cityList.map((city, index) => <MenuItem value={index} key={index} primaryText={cityList[index]}/>)}
          </DropDownMenu>

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
