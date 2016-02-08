/**
 * Created by hanwencheng on 1/6/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {isLoaded, load as getList, onLocationChange} from 'redux/modules/entities';
import {bindActionCreators} from 'redux';
import { LinkContainer } from 'react-router-bootstrap';
import connectData from 'helpers/connectData';

import {DropDownMenu, MenuItem, AppBar,RaisedButton, GridList, GridTile,
  IconButton, ThemeManager, ThemeDecorator, StarBorder} from 'material-ui';

import {Carousel} from 'components';
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

  render() {
    const styles = require('./Entities.scss');
    const {loaded, getList, error, loading, locationId, onLocationChange} = this.props;
    const houses = this.props.entities;

    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }

    var Decorators = [
      {component: React.createClass({render() {
        return (
          <div className={styles.arrowContainer} onClick={this.props.previousSlide}>
            <i className={styles.arrowIcon + " fa fa-angle-double-left fa-2x"}/>
          </div>)}
      }),
        position: 'CenterLeft', style: {height: "100%"}},
      {component: React.createClass({render() {
        return (
          <div className={styles.arrowContainer} onClick={this.props.nextSlide}>
            <i className={styles.arrowIcon + " fa fa-angle-double-right fa-2x"}/>
          </div>)}
      }),
        position: 'CenterRight', style: {height: "100%"}},
    ];

    return (
      <div>
        <div className={styles.listNav}>
          <DropDownMenu value={locationId} onChange={onLocationChange} className={styles.dropDown}>
            {/* the value starts from 1 */}
            {cityList.map((city, index) => <MenuItem value={index} key={index} primaryText={cityList[index]}/>)}
          </DropDownMenu>

          <RaisedButton onClick={this.loadCity}><i className={refreshClassName}/> 载入</RaisedButton>
        </div>

        {loaded &&
        <div className={styles.gridContainer}>
          { houses.length ?
            <GridList cellHeight={300} padding={50} cols={3} className={styles.gridList}>
              {houses.map((house, index) => (
                <GridTile
                  className={styles.tile}
                  key={house.id}
                  style={{"display" : "flex", "alignItems":"center", "justifyContent": "center"}}
                  title={house.title}
                  subtitle={<span>by <b>{house.owner}</b> In <b>{house.city}</b></span>}
                  actionIcon={<IconButton iconClassName="fa fa-hand-o-right fa-4x" iconStyle={{"color" : "white"}}/>}
                >
                  <Carousel key={house.id} decorators={Decorators} className={styles.carousel} width={"100%"}
                            initialSlideHight={300} initialSlideWidth={500} slidesToShow={1}>
                    {house.images && house.images.length >= 1 && house.images.map((address, index) => (
                      <div key={index} className={styles.imageContainer}>
                        <LinkContainer to={`/entities/${houses.length}`}>
                          <img key={index} src={address}/>
                        </LinkContainer>
                      </div>
                    ))}
                  </Carousel>
                </GridTile>
              ))}
            </GridList> :

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
