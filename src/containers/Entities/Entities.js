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
    entities : PropTypes.object,
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
    const { entities, getList, error, loading, locationId, onLocationChange } = this.props;
    const houses = entities.list;
    console.log('entities are', houses)

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
        </div>

        <RaisedButton label="My Button"
                      onClick={this.addNumber} />

        <div className={styles.container}>
          <GridList cellHeight={600} cellWidth={400} style={styles.gridList}>
            {/* id, city, owner, title, price, images*/}
          {houses.map((house, index) => (
            <GridTile
              key={index}
              title={house.title}
              subtitle={<span>by <b>{house.owner}</b> In <b>{house.city}</b></span>}
              actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
            >
              <Carousel className={styles.slider} framePadding="20px" slidesToShow={1}>
                {house.images && house.images.length >= 1 && house.images.map(address => (<img src={address}/>))}
              </Carousel>
            </GridTile>
          ))}
          </GridList>
        </div>

        <div className="container">
          {entities && entities.number &&
            <LinkContainer to={`/entities/${entities.number}`}>
              <button>link to entity with number {entities.number}</button>
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
