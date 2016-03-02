/**
 * Created by hanwencheng on 1/22/16.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import uiStyles from '../../theme/uiStyles';
import {onContactOpen, onContactClose, onStartEdit, onChangeSearchValue} from "redux/modules/entity";
import {onSetContactError} from 'redux/modules/error';
import {Carousel, Map} from 'components';
import {RaisedButton, FlatButton, FontIcon, Paper, Dialog, Card, CardActions,
  CardHeader, CardMedia, CardTitle, CardText, List, ListItem, Divider, TextField} from 'material-ui'

var config = require('../../config');

@connect(
  state => ({
    entity: state.entity.data,
    contactOpen : state.entity.contactOpen,
    cachedImages : state.entity.cachedImages,
    user : state.auth.user,
    searchValue : state.entity.searchValue,
  }),
  {onContactOpen, onContactClose, onStartEdit, onChangeSearchValue, onSetContactError}
)
export default class SubmitTemplate extends Component {
  static propTypes = {
    entity: PropTypes.object,
    contactOpen : PropTypes.bool,
    cachedImages: PropTypes.array,
    user : PropTypes.object,
    searchValue :PropTypes.string,

    onSetContactError : PropTypes.func.isRequired,
    onContactOpen : PropTypes.func.isRequired,
    onContactClose : PropTypes.func.isRequired,
    onStartEdit : PropTypes.func.isRequired,
    onChangeSearchValue : PropTypes.func.isRequired,

    nextSlide :PropTypes.func,
    previousSlide : PropTypes.func,
  }

  render() {
    const styles = require('./SubmitTemplate.scss');
    const image1 = require('./a1.jpg');
    const image2 = require('./b1.jpg');
    const image3 = require('./c1.jpg');
    const {entity, contactOpen, cachedImages, user, searchValue} = this.props;

    function capitalizeFirstLetter(string) {
      return string[0].toUpperCase() + string.slice(1);
    }

    const onContactClick = (event) => {
      if(user){
        this.props.onContactOpen()
      }else{
        this.props.onSetContactError();
      }
    }

    const handleSearchButtonClick = (event) => {
      console.log('now search !')
    }

    const formatDate = (dateString) =>
    {
      const date = new Date(dateString)
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return day + '/' + month + '/' + year;
    }

    const containerClass = this.props.user ? styles.container : styles.containerBeforeLogin;

    return (
      <div className={containerClass}>
        <div className={styles.card}>

          <div className={styles.cardMedia}>
            <div className={styles.cardPhoto}>
              <Carousel className={styles.carousel} framePadding="32px" width="100%" slidesToShow={1}>
                {entity.images.length >= 1 && entity.images.map(address => (<div className={styles.imageContainer}><img src={address}/></div>))}
                {cachedImages.length >= 1 && cachedImages.map(file => <div className={styles.imageContainer}><img src={window.URL.createObjectURL(file)}/></div>)}
                {entity.images.length == 0 && cachedImages.length == 0 &&  <div className={styles.imageContainer}><img src={config.noImagePath}/></div>}
              </Carousel>
            </div>

            <div className={styles.cardTitle}>
              <div className={styles.cardTitleTitle}>{entity.title ? entity.title : ""}</div>
              <div className={styles.cardTitleUsername}>by {entity.username? entity.username : ""}</div>
            </div>

            <div className={styles.cardText}>
              {entity.description ? entity.description : ""}
            </div>


            <div className={styles.cardActions}>
              <div className={styles.contactHost}>
                <FlatButton style={uiStyles.actionButton} onClick={onContactClick}><span className="fa fa-envelope"/> 联系房主</FlatButton>
              </div>

              <div className={styles.dialog}>
                <Dialog
                  actions={
                  <div>
                    <FlatButton onClick={this.props.onContactClose} className={styles.hvrBuzzOut}>
                      <span className="fa fa-child"/>
                      <span>  </span>OK
                    </FlatButton>
                  </div>
                  }

                  modal={false}
                  open={contactOpen}
                  onRequestClose={this.props.onContactClose}
                >
                  <div className={styles.contactInfo}>
                    <div className={styles.infoTitle}> {entity.username ? entity.username : ""}的联系方式:</div>
                    <div className={styles.infoListMail}> <i className="fa fa-envelope-o" />  邮箱: &nbsp; {entity.email ? entity.email : ""} </div>
                    <div className={styles.infoListPhone}> <i className="fa fa-phone" />  手机: &nbsp; {entity.phone ? entity.phone : ""} </div>
                  </div>
                </Dialog>
              </div>
            </div>
          </div>

          { entity.lat && entity.lng &&
            <div className={styles.mapContainer}>
              {/*<div className={styles.searchBar}>
                <div className={styles.searchInput}>
                  <TextField hintText="查询距离" value={searchValue}
                             onChange={(event) => {
                             //can't show value here
                    console.log('event is', event, 'value is', event.target)
                    this.props.onChangeSearchValue(value);
                  }}/>
                </div>
                <div className={styles.searchButton}>
                <RaisedButton label="确定" onClick={handleSearchButtonClick}/>
                </div>
              </div>*/}
              <div className={styles.map}>
                <Map geometry={[entity.lat, entity.lng]}/>
              </div>
            </div>
          }
        </div>
        <div className={styles.list}>
          <div className={styles.innerList}>
            <div className={styles.rowContainer}><i className="fa fa-location-arrow"/> 城市 : &nbsp;&nbsp;  {entity.city ? capitalizeFirstLetter(entity.city) : ""}</div>
            <div className={styles.rowContainer}><i className="fa fa-map-marker"/>地址 : &nbsp;&nbsp;  {entity.location}</div>
            <div className={styles.rowContainer}><i className="fa fa-square"/> 面积 : &nbsp;&nbsp;  {entity.size ?  entity.size + " m²" : "未指定"}</div>
            <div className={styles.rowContainer}><i className="fa fa-cube"/> 类型 : &nbsp;&nbsp;  {entity.type ? "WG" : "Wohnung/Apartment"}</div>
            <div className={styles.rowContainer}><i className="fa fa-eur"/> 租金 : &nbsp;&nbsp; {(entity.priceType ? "冷租" : "暖租" ) + ' ' + entity.price} &nbsp; Eur</div>
            <div className={styles.rowContainer}><i className="fa fa-lock"/> 押金 : &nbsp;&nbsp;  {entity.caution ? entity.caution + " Eur" : "未指定"} </div>
            <div className={styles.rowContainer}><i className="fa fa-calendar"/> 租期 : &nbsp;&nbsp; {formatDate(entity.startDate)} &nbsp;-- &nbsp;{entity.endDate ? "无期限" : formatDate(entity.startDate) } </div>
            {user && user._id && user._id == entity.owner &&
            <RaisedButton style={uiStyles.buttonStyleEdit} key={12} className={styles.editButton} onClick={this.props.onStartEdit}><span
              className="fa fa-pencil"/> 编辑</RaisedButton>
            }
          </div>
        </div>
      </div>
    );
  }
}


