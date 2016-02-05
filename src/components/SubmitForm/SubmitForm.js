/**
 * Created by hanwencheng on 1/22/16.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';

import {onEndEdit, onAddImage, onChangeSlide} from "redux/modules/entity";
import FlatButton from 'material-ui/lib/flat-button';
//import Slider from 'nuka-carousel';
import {Carousel} from 'components';

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
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

import DatePicker from 'material-ui/lib/date-picker/date-picker';
import DropZone from 'react-dropzone'


@connect(
  state => ({
    entity: state.entity.data,
    initialValues : state.entity.data,
    cachedImages : state.entity.cachedImages,
    currentSlide : state.entity.currentSlide,
  }),
  {onEndEdit, onAddImage, onChangeSlide}
)

@reduxForm({
  form: 'house',
  //later should delete images in fields
  fields : ['city','location','roomNumber','size','price','caution','startDate','endDate',
    'description','title','owner','email','phone', 'type','note','maximumPerson', 'images'],
  //validate : registerValidation,
  //asyncValidate,
  //asyncBlurFields: ["email", "name"],
})
export default class SubmitForm extends Component {
  static propTypes = {
    entity: PropTypes.object,
    onEndEdit: PropTypes.func.isRequired,
    onAddImage : PropTypes.func.isRequired,
    onChangeSlide : PropTypes.func.isRequired,
    cachedImages: PropTypes.array,
    currentSlide : PropTypes.number,

    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    nextSlide :PropTypes.func,
    previousSlide : PropTypes.func,
  }

  dateFormat = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return day + '/' + month + '/' + year;
  }

  onDrop = (file) => {
    console.log('file is', file)
    this.props.onAddImage(file);
  }

  render() {
    const styles = require('./SubmitForm.scss');
    const {
      fields: {location,city,roomNumber,size,price,caution,startDate,endDate,
        description,title,owner,email,phone,type,note,maximumPerson,images},
      entity,
      //resetForm,
      cachedImages,
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
              <i onClick={this.props.previousSlide} className="fa fa-arrow-left fa-lg"/>
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
              <i onClick={this.props.nextSlide} className="fa fa-arrow-right fa-lg"/>
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
          <CardMedia>
            <div>
              <Carousel key={211} className={styles.slider} decorators={Decorators} framePadding="50px" width="100%" slidesToShow={1}
                        onChange={this.props.onChangeSlide}>
                {entity.images && entity.images.length >= 1 && entity.images.map( address =><img src={address}/>)}
                {cachedImages && cachedImages.length >= 1 && cachedImages.map(file => <img src={window.URL.createObjectURL(file)}/>)}
                {(entity.images.length + cachedImages.length < 3) &&
                  <div className={styles.dropBox}>
                    <DropZone onDrop={this.onDrop}>
                      <div className={styles.inner}>
                        <span className={styles.boxFont}>请点击选择图片或者将图片拖动到框中</span>
                        <span className={styles.boxFont + " fa fa-plus-circle fa-5x"}/>
                      </div>
                    </DropZone>
                  </div>
                }
              </Carousel>
            </div>
          </CardMedia>
          <FlatButton>删除图片1</FlatButton> <FlatButton>删除图片2</FlatButton> <FlatButton>删除图片3</FlatButton>
          <CardTitle subtitle={entity.owner} >
            <div className="hint--top" data-hint="标题">
            <TextField key={201} hintText="标题" {...title}/>
            </div>
          </CardTitle>
          <CardText>
            <div>
              <textarea key={202} className={"form-control " + styles.textArea} rows="6" placeholder="填写一些具体介绍吧" {...description}/>
            </div>
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
            <TextField key={30} hintText="房间数" {...roomNumber}/>
          </ListItem>
          <ListItem key={4} className="hint--top" data-hint="面积" leftIcon={<FontIcon className="fa fa-th" />}>
            <TextField key={40} hintText="面积" {...size}/>
          </ListItem>
          <ListItem key={5} className="hint--top" data-hint="租金" leftIcon={<FontIcon className="fa fa-euro" />}>
            <TextField key={50} hintText="租金" {...price}/>
          </ListItem>
          <ListItem key={6} className="hint--top" data-hint="押金" leftIcon={<FontIcon className="fa fa-money" />}>
            <TextField key={60} hintText="押金" {...caution}/>
          </ListItem>
          <ListItem key={7} className="hint--top" data-hint="最多人数" leftIcon={<FontIcon className="fa fa-child" />}>
            <TextField key={70} hintText="最多人数" {...maximumPerson}/>
          </ListItem>
          <ListItem key={14} className="hint--top" data-hint="类型" leftIcon={<FontIcon className="fa fa-home" />}>
            <SelectField key={141} value={type.value} onChange={(event, value) => {
            console.log('value is', value)
            type.onChange(value);
            }}>
              <MenuItem value={0} primaryText="整套公寓"/>
              <MenuItem value={1} primaryText="单间"/>
            </SelectField>
          </ListItem>

          <ListItem key={8} className="hint--top" data-hint="开始结束日期" leftIcon={<FontIcon className="fa fa-calendar" />} children={
            <div key={83}>
            {/*every child should have a key, or react give a stupid warnning */}
              <DatePicker key={81} autoOk={true} value={new Date(startDate.value)}
              onChange={(event, newDate) => startDate.onChange(newDate)} formatDate={this.dateFormat}/>
              <DatePicker key={82} autoOk={true} value={new Date(endDate.value)}
              onChange={(event, newDate) => endDate.onChange(newDate)} formatDate={this.dateFormat}/>
            </div>
          }>


          </ListItem >
          <ListItem key={9} className={styles.note} zDepth={2} className="hint--top" data-hint="备注">
            <TextField key={90} hintText="备注" {...note}/>
          </ListItem>
          <ListItem key={11} className="hint--top" data-hint="邮箱" leftIcon={<FontIcon className="fa fa-envelope-o" />}>
            <TextField key={110} hintText="邮箱" {...email}/>
          </ListItem>
          <ListItem key={12} className="hint--top" data-hint="手机" leftIcon={<FontIcon className="fa fa-mobile-phone" />}>
            <TextField key={120} hintText="手机" {...phone}/>
          </ListItem>

          <FlatButton key={13} className={styles.editButton} onClick={handleSubmit}><span className="fa fa-pencil"/> 保存</FlatButton>
        </List>
      </form>
    );
  }
}


