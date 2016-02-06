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

import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import IconButton from 'material-ui/lib/icon-button';
import {Carousel} from 'components';

import myRawTheme from '../../theme/materialUI.theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';

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
    entities: state.entities.list,
    error: state.entities.error,
    loading: state.entities.loading,
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

    getList: PropTypes.func.isRequired,
    onLocationChange: PropTypes.func.isRequired,
  };

  addNumber = (event) => {
    event.preventDefault();
    this.props.getList()
  }

  render() {
    const styles = require('./Entities.scss');
    const {getList, error, loading, locationId, onLocationChange } = this.props;
    const houses = this.props.entities;

    console.log('entities are', houses)

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
            <MenuItem value={1} primaryText="Berlin"/>
            <MenuItem value={2} primaryText="Stuttgart"/>
            <MenuItem value={3} primaryText="Munich"/>
            <MenuItem value={4} primaryText="Hamburg"/>
            <MenuItem value={5} primaryText="NordWestfalen"/>
          </DropDownMenu>

          <RaisedButton label="My Button" onClick={this.addNumber} />
        </div>


        <div className={styles.container + " " + styles.gridContainer}>
          {houses.length &&
          <GridList cellHeight={300} padding={50} cols={3} className={styles.gridList}>
            {houses.map((house, index) => (
              <GridTile
                className={styles.tile}
                key={index}
                style={{"display" : "flex", "alignItems":"center", "justifyContent": "center"}}
                title={house.title}
                subtitle={<span>by <b>{house.owner}</b> In <b>{house.city}</b></span>}
                actionIcon={<IconButton iconClassName="fa fa-hand-o-right fa-4x" iconStyle={{"color" : "white"}}/>}
              >
                <Carousel key={house.id} decorators={Decorators} className={styles.carousel} width={"100%"}
                          slidesToShow={1}>
                  {house.images && house.images.length >= 1 && house.images.map(address => (
                    <LinkContainer to={`/entities/${houses.length}`}>
                    <div className={styles.imageContainer}>
                      <img src={address}/>
                    </div>
                    </LinkContainer>))}
                </Carousel>
              </GridTile>
            ))}
          </GridList>}

          {houses.length && <p>这个地区暂时没可用的房源</p>}
        </div>

        <div className="container">
          {houses && houses.number &&
            <LinkContainer to={`/entities/${houses.length}`}>
              <button>link to entity with number {houses.length}</button>
            </LinkContainer>
          }
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
