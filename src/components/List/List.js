/**
 * Created by hanwencheng on 2/10/16.
 */
import React, {Component, PropTypes} from 'react';
import {GridList, GridTile,
  IconButton} from 'material-ui';
import {Carousel} from 'components';
import { LinkContainer } from 'react-router-bootstrap';

var config = require('../../config');

export default class List extends Component {
  static propTypes = {
    houses : PropTypes.array.isRequired
  };

  render(){
    const styles = require('./List.scss');
    const {loaded, getList, error, locationId, onLocationChange} = this.props;
    const houses = this.props.houses;

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
        <GridList cellHeight={300} padding={50} cols={3} className={styles.gridList}>
          {houses.map((house, index) => (
            <GridTile
              className={styles.tile}
              key={house._id}
              style={{"display" : "flex", "alignItems":"center", "justifyContent": "center"}}
              title={house.title}
              subtitle={<span>by <b>{house.username}</b> In <b>{house.city}</b></span>}
              actionIcon={<IconButton iconClassName="fa fa-hand-o-right fa-4x" iconStyle={{"color" : "white"}}/>}
            >
              <Carousel key={house._id} decorators={Decorators} className={styles.carousel} width={"100%"}
                        initialSlideHight={300} initialSlideWidth={500} slidesToShow={1}>
                { house.images.length ?
                  house.images.map((address, index) => (
                    <div key={index} className={styles.imageContainer}>
                      <LinkContainer to={`/entities/${house._id}`}>
                        <img key={index} src={address}/>
                      </LinkContainer>
                    </div>
                  ))
                  :
                  <div key={998} className={styles.imageContainer}>
                    <LinkContainer to={`/entities/${house._id}`}>
                      <img key={999} src={config.iconPath}/>
                    </LinkContainer>
                  </div>
                }
                {house.images && house.images.length >= 1 && house.images.map((address, index) => (
                  <div key={index} className={styles.imageContainer}>
                    <LinkContainer to={`/entities/${house._id}`}>
                      <img key={index} src={address}/>
                    </LinkContainer>
                  </div>
                ))}
              </Carousel>
            </GridTile>
          ))}
        </GridList>
    )
  }
}