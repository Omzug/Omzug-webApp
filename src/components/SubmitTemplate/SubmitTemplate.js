/**
 * Created by hanwencheng on 1/22/16.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import uiStyles from '../../theme/uiStyles';

import {onContactOpen, onContactClose, onStartEdit} from "redux/modules/entity";

import {Carousel, Map} from 'components';
import {RaisedButton, FlatButton, FontIcon, Paper, Dialog, Card, CardActions,
  CardHeader, CardMedia, CardTitle, CardText, List, ListItem, Divider} from 'material-ui'

var config = require('../../config');

@connect(
  state => ({
    entity: state.entity.data,
    contactOpen : state.entity.contactOpen,
    cachedImages : state.entity.cachedImages,
    userId : state.auth.user._id,
  }),
  {onContactOpen, onContactClose, onStartEdit}
)
export default class SubmitTemplate extends Component {
  static propTypes = {
    entity: PropTypes.object,
    contactOpen : PropTypes.bool,
    cachedImages: PropTypes.array,
    userId : PropTypes.string,

    onContactOpen : PropTypes.func.isRequired,
    onContactClose : PropTypes.func.isRequired,
    onStartEdit : PropTypes.func.isRequired,

    nextSlide :PropTypes.func,
    previousSlide : PropTypes.func,
  }

  render() {
    const styles = require('./SubmitTemplate.scss');
    const image1 = require('./a1.jpg');
    const image2 = require('./b1.jpg');
    const image3 = require('./c1.jpg');
    const {entity, contactOpen, cachedImages, userId} = this.props;

    var Decorators = [
      {component: React.createClass({render() {
        return (
          <div className={styles.arrowContainer1} onClick={this.props.previousSlide}>
            <i className={styles.arrowIcon + " fa fa-angle-double-left fa-2x"}/>
          </div>)}
      }),
        position: 'CenterLeft', style: {height: "100%"}},
      {component: React.createClass({render() {
        return (
          <div className={styles.arrowContainer1} onClick={this.props.nextSlide}>
            <i className={styles.arrowIcon + " fa fa-angle-double-right fa-2x"}/>
          </div>)}
      }),
        position: 'CenterRight', style: {height: "100%"}},
    ];

    const pickerStyle ={
      display:'inline'
    }

    const formatDate = (dateString) =>
    {
      const date = new Date(dateString)
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return day + '/' + month + '/' + year;
    }

    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <Card style={uiStyles.card}>
            {/*
            <CardHeader
              title="房子的标题"
              subtitle="房子的副标题"
              avatar="http://lorempixel.com/100/100/nature/"
            />
            */}
            <CardMedia style={uiStyles.CardMedia}>
              <div>
                <Carousel className={styles.slider} decorators={Decorators} framePadding="50px" width="100%" slidesToShow={1}>
                  {entity.images.length >= 1 && entity.images.map(address => (<div className={styles.imageContainer}><img src={address}/></div>))}
                  {cachedImages.length >= 1 && cachedImages.map(file => <div className={styles.imageContainer}><img src={window.URL.createObjectURL(file)}/></div>)}
                  {entity.images.length == 0 && cachedImages.length == 0 &&  <div className={styles.imageContainer}><img src={config.noImagePath}/></div>}
                </Carousel>
              </div>
            </CardMedia>
            <div className={styles.cardTitle}>
              <div><CardTitle style={uiStyles.CardTitle} title={entity.title} subtitle={"by " + entity.username} /></div>
            </div>
            <div className={styles.cardText}>
              <div><CardText style={uiStyles.CardText}>
                {entity.description}
              </CardText></div>
            </div>

            <CardActions>
              <FlatButton style={uiStyles.actionButton} onClick={this.props.onContactOpen}><span className="fa fa-envelope"/> 联系房主</FlatButton>
              {/*<FlatButton style={uiStyles.actionButton}
                          className={styles.button} onClick={this.props.onContactOpen}><span className="fa fa-share"/> 分享</FlatButton>*/}

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
                  <div className={styles.infoTitle}> {entity.username}的联系方式:</div>
                  <div className={styles.infoListMail}> <i className="fa fa-envelope-o" />  邮箱: &nbsp; {entity.email} </div>
                  <div className={styles.infoListPhone}> <i className="fa fa-phone" />  手机: &nbsp; {entity.phone} </div>
                </div>
              </Dialog>
            </div>

            </CardActions>
          </Card>
          <div className={styles.map}>
            <Map/>
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.innerList}>
            <div className={styles.rowContainer}><i className="fa fa-location-arrow"/> 城市 : &nbsp; {entity.city}</div>
            <div className={styles.rowContainer}><i className="fa fa-map-marker"/>地址 : &nbsp; {entity.location}</div>
            <div className={styles.rowContainer}><i className="fa fa-square"/> 面积 : &nbsp; {entity.size} &nbsp;m²</div>
            <div className={styles.rowContainer}><i className="fa fa-cube"/> 类型 : &nbsp; {entity.type ? "WG" : "Wohnung/Apartment"}</div>
            <div className={styles.rowContainer}><i className="fa fa-eur"/> 租金 : &nbsp;{(entity.priceType ? "冷租" : "暖租" ) + ' ' + entity.price} &nbsp; Eur</div>
            <div className={styles.rowContainer}><i className="fa fa-lock"/> 押金 : &nbsp; {entity.caution} &nbsp;Eur</div>
            <div className={styles.rowContainer}><i className="fa fa-calendar"/> 租期 : &nbsp;{formatDate(entity.startDate)} &nbsp;-- &nbsp;{entity.endDate ? "无期限" : formatDate(entity.startDate) } </div>
            {userId && userId == entity.owner &&
            <RaisedButton style={uiStyles.buttonStyleEdit} key={12} className={styles.editButton} onClick={this.props.onStartEdit}><span
              className="fa fa-pencil"/> 编辑</RaisedButton>
            }
          </div>


        </div>

        {/*<List className={styles.list}>
          <ListItem key={1} className="hint--top" data-hint="城市" primaryText={entity.city} leftIcon={<FontIcon className="fa fa-map-marker" />} />
          <ListItem key={2} className="hint--top" data-hint="地址" primaryText={entity.location} leftIcon={<FontIcon className="fa fa-map" />} />
          <ListItem key={3} className="hint--top" data-hint="房间数" primaryText={entity.roomNumber} leftIcon={<FontIcon className="fa fa-codepen" />} />
          <ListItem key={4} className="hint--top" data-hint="面积" primaryText={entity.size}  leftIcon={<FontIcon className="fa fa-th" />}/>
          <ListItem key={5} className="hint--top" data-hint="租金" primaryText={entity.price}  leftIcon={<FontIcon className="fa fa-euro" />}/>
          <ListItem key={6} className="hint--top" data-hint="押金" primaryText={entity.caution}  leftIcon={<FontIcon className="fa fa-money" />}/>
          <ListItem key={7} className="hint--top" data-hint="最多人数" primaryText={entity.maximumPerson}  leftIcon={<FontIcon className="fa fa-child" />}/>
          <ListItem key={8} className="hint--top" data-hint="类型" primaryText={entity.type? "整套出租" : "单间"}  leftIcon={<FontIcon className="fa fa-home" />}/>
          <ListItem key={9} leftIcon={<FontIcon className="fa fa-calendar" />} children={
          <div>
            <p className="hint--top" data-hint="开始日期">{formatDate(entity.startDate)}</p>
            <br/>
            <p className="hint--top" data-hint="结束日期">{entity.endDate? formatDate(entity.endDate): "无限制"}</p>
          </div>
          }>
          </ListItem>



          {entity.note &&
            <ListItem key={11} className={styles.note} zDepth={2} className="hint--top" data-hint="备注">
              <p className={styles.note}>{entity.note}</p>
            </ListItem>
          }

          {userId && userId == entity.owner &&
          <RaisedButton key={12} className={styles.editButton} onClick={this.props.onStartEdit}><span
            className="fa fa-pencil"/> 编辑</RaisedButton>
          }
        </List>*/}
      </div>
    );
  }
}


