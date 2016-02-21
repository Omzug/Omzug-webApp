/**
 * Created by hanwencheng on 2/10/16.
 */
import React, {Component, PropTypes, ExecutionEnvironment} from 'react';
import {GridList, GridTile, Dialog, IconButton, FlatButton} from 'material-ui';
import {Carousel} from 'components';
import { LinkContainer } from 'react-router-bootstrap';
import {onOpenDialog, onCloseDialog } from 'redux/modules/admin';
import {onStartEdit} from "redux/modules/entity";
import {connect} from 'react-redux';
import uiStyle from '../../theme/uiStyles'

var config = require('../../config');

@connect(
  state => ({
    userId : state.auth.user._id,
    popover : state.admin.popover,
    toDelete : state.admin.toDelete,
  }),
  {onOpenDialog, onCloseDialog, onStartEdit}
)
export default class List extends Component {
  static propTypes = {
    userId : PropTypes.string.isRequired,
    houses : PropTypes.array.isRequired,
    popover : PropTypes.bool,
    toDelete : PropTypes.object,

    onDeleteHouse: PropTypes.func.isRequired,
    onOpenDialog : PropTypes.func.isRequired,
    onCloseDialog : PropTypes.func.isRequired,
    onStartEdit :PropTypes.func.isRequired,
  };

  render(){
    const styles = require('./List.scss');
    const {onDeleteHouse, onOpenDialog, onCloseDialog, toDelete} = this.props;
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

    const deleteHouse = (event) => {
      onCloseDialog(event);
      if(toDelete){
        onDeleteHouse(this.props.userId, toDelete.house._id, toDelete.index)
      }
    }

    const startEdit = (event) => {
      this.props.onStartEdit()
    }

    const saveIndex = (house, index, event) => {
      onOpenDialog(house, index)
    }

    const renderIcon = (house, index) => {
      const iconStyle = {"color" : "white"}
      if(house.owner === this.props.userId){
        return(
          <span>
            <LinkContainer to={`/entities/${house._id}`}>
              <IconButton iconClassName="fa fa-pencil" onClick={startEdit} iconStyle={iconStyle}/>
            </LinkContainer>
            <IconButton iconClassName="fa fa-trash" onClick={saveIndex.bind(this, house, index)} iconStyle={iconStyle}/>
            <Dialog
              title="确认删除"
              actions={[
                <FlatButton
                  label="取消"
                  onClick={onCloseDialog}
                />,
                <FlatButton
                  label="删除"
                  keyboardFocused={true}
                  onClick={deleteHouse}
                  labelStyle={uiStyle.dialogConfirmStyle}
                />,
              ]}
              modal={false}
              open={this.props.popover}
              onRequestClose={onCloseDialog}
            >
              确认要删除?
            </Dialog>
          </span>
        )
      }else{
        return <IconButton iconClassName="fa fa-hand-o-right fa-4x" iconStyle={iconStyle}/>
      }
    }

    const checkScroll = (event)=>{
      console.log('now scroll, the evnt is ', event)
    }

    return (
        <GridList cellHeight={300} padding={50} cols={3} className={styles.gridList} onScroll={checkScroll}>
          {houses.map((house, index) => (
            <GridTile
              className={styles.tile}
              key={house._id}
              style={{"display" : "flex", "alignItems":"center", "justifyContent": "center", minWidth:"300px"}}
              title={house.title}
              subtitle={<span>by <b className={styles.usernameColor}>{house.username}</b> In
              <b className={styles.cityColor}> {house.city}</b></span>}
              actionIcon={renderIcon(house, index)}
            >
              <Carousel key={house._id} decorators={Decorators} className={styles.carousel} width={"100%"}
                        initialSlideHight={300} initialSlideWidth={500}>
                { house.images && house.images.length ?
                  house.images.map((address, index) => (
                    <div key={index} className={styles.imageContainer}>
                      <LinkContainer to={'/entities/' + house._id}>
                        <img key={index} src={address}/>
                      </LinkContainer>
                    </div>
                  ))
                  :
                  <div key={998} className={styles.imageContainer}>
                    <LinkContainer to={'/entities/' + house._id}>
                      <img key={999} src={config.iconPath}/>
                    </LinkContainer>
                  </div>
                }
              </Carousel>
            </GridTile>
          ))}
        </GridList>


    )
  }
}