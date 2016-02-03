/**
 * Created by hanwencheng on 1/22/16.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import FlatButton from 'material-ui/lib/flat-button';
import Slider from 'nuka-carousel';

import FontIcon from 'material-ui/lib/font-icon';

import Paper from 'material-ui/lib/paper';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

import DatePicker from 'material-ui/lib/date-picker/date-picker';


@connect(
  state => ({
    entity: state.entity.data,
  }),
  {}
)
export default class SubmitForm extends Component {
  static propTypes = {
    entity: PropTypes.object,
  }

  render() {
    const styles = require('./SubmitForm.scss');
    const {entity} = this.props;

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
          <CardMedia
          >
            <Slider className={styles.slider} decorators={Decorators} framePadding="50px" slidesToShow={1}>
              <img/>
              <img/>
              <img/>
            </Slider>
          </CardMedia>
          <CardTitle title="房屋标题" subtitle="房屋副标题" />
          <CardText>
            Lorem ipsum sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions>
            <FlatButton className={styles.button} onClick={this.handleSubmit}><span className="fa fa-envelope"/> 联系房主</FlatButton>
            <FlatButton className={styles.button} onClick={this.handleSubmit}><span className="fa fa-share"/> 分享</FlatButton>
          </CardActions>
        </Card>

        <List className={styles.list}>
          <ListItem className="hint--top" data-hint="城市" primaryText={entity? entity.city : "城市"} leftIcon={<FontIcon className="fa fa-map-marker" />} />
          <ListItem className="hint--top" data-hint="地址" primaryText={entity? entity.location : "地址"} leftIcon={<FontIcon className="fa fa-map" />} />
          <ListItem className="hint--top" data-hint="房间数" primaryText={entity? entity.roomNumber: "房间数"} leftIcon={<FontIcon className="fa fa-codepen" />} />
          <ListItem className="hint--top" data-hint="面积" primaryText={entity? entity.roomNumber: "房间数"}  leftIcon={<FontIcon className="fa fa-th" />}/>
          <ListItem className="hint--top" data-hint="租金" primaryText={entity? entity.roomNumber: "房间数"}  leftIcon={<FontIcon className="fa fa-euro" />}/>
          <ListItem className="hint--top" data-hint="押金" primaryText={entity? entity.roomNumber: "房间数"}  leftIcon={<FontIcon className="fa fa-money" />}/>
          <ListItem className="hint--top" data-hint="最多人数" primaryText={entity.maximumPerson}  leftIcon={<FontIcon className="fa fa-child" />}/>
          <ListItem className="hint--top" data-hint="开始结束日期" leftIcon={<FontIcon className="fa fa-calendar" />} children={
          <span>
          <DatePicker hintText="Landscape Dialog" mode="landscape" />
          <DatePicker hintText="Landscape Dialog" mode="landscape" />
          </span>
          }>

          </ListItem>
          <Divider/>
          <ListItem className={styles.note} zDepth={2} className="hint--top" data-hint="备注">
            <p className={styles.note}>{entity.note}</p>>
          </ListItem>
          <ListItem className="hint--top" data-hint="邮箱" primaryText={entity.email} leftIcon={<FontIcon className="fa fa-envelope-o" />} />
          <ListItem className="hint--top" data-hint="手机" primaryText={entity.phone} leftIcon={<FontIcon className="fa fa-mobile-phone" />} />




          <FlatButton className={styles.button} onClick={this.handleSubmit}><span className="fa fa-pencil"/> Edit</FlatButton>
        </List>
      </div>
    );
  }
}


