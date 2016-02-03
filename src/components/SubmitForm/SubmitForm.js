/**
 * Created by hanwencheng on 1/22/16.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';

import {onEndEdit} from "redux/modules/entity";
import FlatButton from 'material-ui/lib/flat-button';
import Slider from 'nuka-carousel';

import TextField from 'material-ui/lib/text-field';
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
    initialValues : state.entity.data,
  }),
  {onEndEdit}
)

@reduxForm({
  form: 'house',
  fields : ['city','location','roomNumber','size','price','caution','startDate','endDate',
    'description','title','owner','email','phone', 'type','note','maximumPerson'],
  //validate : registerValidation,
  //asyncValidate,
  //asyncBlurFields: ["email", "name"],
})
export default class SubmitForm extends Component {
  static propTypes = {
    entity: PropTypes.object,
    onEndEdit: PropTypes.func.isRequired,

    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    nextSlide :PropTypes.func,
    previousSlide : PropTypes.func,
  }

  dateFormat = (date) => {
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const y = date.getFullYear();
    return d + '/' + m + '/' + y;
  }

  render() {
    const styles = require('./SubmitForm.scss');
    const {
      fields: {location,city,roomNumber,size,price,caution,startDate,endDate,
        description,title,owner,email,phone,type,note,maximumPerson},
      entity,
      //resetForm,
      handleSubmit,
      submitting,
      //asyncValidating
      } = this.props;

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
      <form className={styles.container} onSubmit={handleSubmit}>
        <Card className={styles.card}>
          <CardMedia
          >
            <Slider className={styles.slider} decorators={Decorators} framePadding="50px" slidesToShow={1}>
              <img/>
              <img/>
              <img/>
            </Slider>
          </CardMedia>
          <CardTitle title={entity.title} subtitle={entity.owner} />
          <CardText>
            <div>{entity.description}</div>>
          </CardText>
        </Card>

        <List className={styles.list}>
          <ListItem key={1} className="hint--top" data-hint="城市" leftIcon={<FontIcon className="fa fa-map-marker"/>} >
            <TextField key={10} hintText="城市" {...city}/>
          </ListItem>
          <ListItem key={2} className="hint--top" data-hint="地址" leftIcon={<FontIcon className="fa fa-map" />}>
            <TextField key={20} hintText="地址" {...location}/>
          </ListItem>
          <ListItem key={3} className="hint--top" data-hint="房间数" leftIcon={<FontIcon className="fa fa-codepen" />}>
            <TextField key={30} hintText="city" {...roomNumber}/>
          </ListItem>
          <ListItem key={4} className="hint--top" data-hint="面积" leftIcon={<FontIcon className="fa fa-th" />}>
            <TextField key={40} hintText="city" {...size}/>
          </ListItem>
          <ListItem key={5} className="hint--top" data-hint="租金" leftIcon={<FontIcon className="fa fa-euro" />}>
            <TextField key={50} hintText="city" {...price}/>
          </ListItem>
          <ListItem key={6} className="hint--top" data-hint="押金" leftIcon={<FontIcon className="fa fa-money" />}>
            <TextField key={60} hintText="city" {...caution}/>
          </ListItem>
          <ListItem key={7} className="hint--top" data-hint="最多人数" leftIcon={<FontIcon className="fa fa-child" />}>
            <TextField key={70} hintText="city" {...maximumPerson}/>
          </ListItem>
          <ListItem key={8} className="hint--top" data-hint="开始结束日期" leftIcon={<FontIcon className="fa fa-calendar" />} children={
            <div key={83}>
            {/*every child should have a key, or react give a stupid warnning */}
            {console.log("if value is a Date :",  startDate.value instanceof Date)}
              <DatePicker key={81} autoOk={true} value={new Date(startDate.value)}
              onChange={(event, newDate) => startDate.onChange(newDate)} formatDate={this.dateFormat}/>
              <DatePicker key={82} autoOk={true} value={new Date(endDate.value)}
              onChange={(event, newDate) => endDate.onChange(newDate)} formatDate={this.dateFormat}/>
            </div>
          }>


          </ListItem >
          <ListItem key={9} className={styles.note} zDepth={2} className="hint--top" data-hint="备注">
            <TextField key={90} hintText="city" {...note}/>
          </ListItem>
          <ListItem key={11} className="hint--top" data-hint="邮箱" leftIcon={<FontIcon className="fa fa-envelope-o" />}>
            <TextField key={110} hintText="city" {...email}/>
          </ListItem>
          <ListItem key={12} className="hint--top" data-hint="手机" leftIcon={<FontIcon className="fa fa-mobile-phone" />}>
            <TextField key={120} hintText="city" {...phone}/>
          </ListItem>

          <FlatButton key={13} className={styles.editButton} onClick={handleSubmit}><span className="fa fa-pencil"/> 保存</FlatButton>
        </List>
      </form>
    );
  }
}


