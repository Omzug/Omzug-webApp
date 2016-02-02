/**
 * Created by hanwencheng on 1/22/16.
 */

import React, {Component, PropTypes} from 'react';

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

export default class SubmitTemplate extends Component {
  static propTypes = {

  }

  render() {
    const styles = require('./SubmitTemplate.scss');
    const image1 = require('./a1.jpg');
    const image2 = require('./b1.jpg');
    const image3 = require('./c1.jpg');

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
        <Card>
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
              <img src={image1}/>
              <img src={image2}/>
              <img src={image3}/>
            </Slider>
          </CardMedia>
          <CardTitle title="房屋标题" subtitle="房屋副标题" />
          <CardText>
            Lorem ipsum <span className="hint--bottom" data-hint="Finally!"> sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.</span>
          </CardText>
          <CardActions>
            <FlatButton className={styles.button} onClick={this.handleSubmit}><span className="fa fa-envelope"/> 联系房主</FlatButton>
            <FlatButton className={styles.button} onClick={this.handleSubmit}><span className="fa fa-share"/> 分享</FlatButton>
          </CardActions>
        </Card>

        <List className={styles.list}>
          <ListItem primaryText="城市" leftIcon={<FontIcon className="fa fa-map-marker" />} />
          <ListItem primaryText="地址" leftIcon={<FontIcon className="fa fa-map" />} />
          <ListItem primaryText="房间数" leftIcon={<FontIcon className="fa fa-codepen" />} />
          <ListItem primaryText="面积" leftIcon={<FontIcon className="fa fa-th" />}/>
          <ListItem primaryText="租金" leftIcon={<FontIcon className="fa fa-euro" />}/>
          <ListItem primaryText="押金" leftIcon={<FontIcon className="fa fa-money" />}/>
          <ListItem leftIcon={<FontIcon className="fa fa-calendar" />} children={
          <span>
          开始: <DatePicker hintText="Landscape Dialog" mode="landscape" />
          结束: <DatePicker hintText="Landscape Dialog" mode="landscape" />
          </span>
          }>

          </ListItem>
          <ListItem>
            <FontIcon className={"fa fa-calendar " + styles.datePicker} />
            <DatePicker hintText="Landscape Dialog" mode="landscape" className={styles.datePicker}/>
          </ListItem>

          <Paper zDepth={2}> Here is the paper </Paper>
          <div className={styles.description}> Here is the description</div>

          <Divider/>

          <FlatButton className={styles.button} onClick={this.handleSubmit}><span className="fa fa-pencil"/> Edit</FlatButton>
        </List>








      </div>
    );
  }
}


