/**
 * Created by hanwencheng on 1/22/16.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {onContactOpen, onContactClose, onStartEdit} from "redux/modules/entity";

import FlatButton from 'material-ui/lib/flat-button';
import {Carousel} from 'components';

import FontIcon from 'material-ui/lib/font-icon';

import Paper from 'material-ui/lib/paper';
import Dialog from 'material-ui/lib/dialog';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

@connect(
  state => ({
    entity: state.entity.data,
    contactOpen : state.entity.contactOpen,
    cachedImages : state.entity.cachedImages,
  }),
  {onContactOpen, onContactClose, onStartEdit}
)
export default class SubmitTemplate extends Component {
  static propTypes = {
    entity: PropTypes.object,
    contactOpen : PropTypes.bool,
    cachedImages: PropTypes.array,

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
    const {entity, contactOpen, cachedImages} = this.props;

    //custom arrows
    var Decorators = [
      {
      component: React.createClass({
        render() {
          return (
            <i onClick={this.props.previousSlide} className="fa fa-arrow-left"/>
          )
        }
      }),
      position: 'CenterLeft',
      style: {
        padding: 20
      }
    },
      {
        component: React.createClass({
          render() {
            return (
              <i onClick={this.props.nextSlide} className="fa fa-arrow-right"/>
            )
          }
        }),
        position: 'CenterRight',
        style: {
          padding: 20
        }
      },

    ];

    const pickerStyle ={
      display:'inline'
    }


    return (
      <div className={styles.container}>
        <Card className={styles.card}>
          {/*
          <CardHeader
            title="房子的标题"
            subtitle="房子的副标题"
            avatar="http://lorempixel.com/100/100/nature/"
          />
          */}
          <CardMedia>
            <div>
              <Carousel className={styles.slider} decorators={Decorators} framePadding="50px" width="100%" slidesToShow={1}>
                {entity.images && entity.images.length >= 1 && entity.images.map(address => (<img src={address}/>))}
                {cachedImages && cachedImages.length >= 1 && cachedImages.map(file =><img src={window.URL.createObjectURL(file)}/>)}
              </Carousel>
            </div>
          </CardMedia>
          <CardTitle title={entity.title} subtitle={entity.owner} />
          <CardText>
            {entity.description}
          </CardText>
          <CardActions>
            <FlatButton className={styles.button} onClick={this.props.onContactOpen}><span className="fa fa-envelope"/> 联系房主</FlatButton>
            <Dialog
              title={entity.owner + "的联系方式"}
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
              <List className={styles.dialog}>
                <ListItem className="hint--top" data-hint="邮箱" primaryText={entity.email} leftIcon={<FontIcon className="fa fa-envelope-o" />} />
                <ListItem className="hint--top" data-hint="手机" primaryText={entity.phone} leftIcon={<FontIcon className="fa fa-mobile-phone" />} />
              </List>
            </Dialog>
            <FlatButton className={styles.button} onClick={this.props.onContactOpen}><span className="fa fa-share"/> 分享</FlatButton>
          </CardActions>
        </Card>

        <List className={styles.list}>
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
            <p className="hint--top" data-hint="开始日期">{entity.startDate}</p>
            <br/>
            <p className="hint--top" data-hint="结束日期">{entity.endDate? entity.endDate: "无限制"}</p>
          </div>
          }>
          </ListItem>

          <Divider key={10}/>

          {entity.note &&
            <ListItem key={11} className={styles.note} zDepth={2} className="hint--top" data-hint="备注">
              <p className={styles.note}>{entity.note}</p>
            </ListItem>
          }


          <FlatButton key={12} className={styles.editButton} onClick={this.props.onStartEdit}><span className="fa fa-pencil"/> 编辑</FlatButton>
        </List>
      </div>
    );
  }
}


