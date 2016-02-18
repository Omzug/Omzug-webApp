/**
 * Created by hanwencheng on 1/22/16.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';

import {onEndEdit, onAddImage, onChangeSlide, onDeleteImage, onToggleLimit} from "redux/modules/entity";
//import Slider from 'nuka-carousel';
import {Carousel} from 'components';
import submitValidation from './submitValidation'

import {TextField, FontIcon, RaisedButton, Card, MenuItem,
  IconButton, CardMedia, CardTitle, CardText, List, ListItem, SelectField,
  DatePicker, Toggle} from 'material-ui';

import DropZone from 'react-dropzone'

@connect(
  state => ({
    entity: state.entity.data,
    hasLimit : state.entity.hasLimit,
    initialValues : state.entity.data,
    cachedImages : state.entity.cachedImages,
    currentSlide : state.entity.currentSlide,
  }),
  {onEndEdit, onAddImage, onChangeSlide, onDeleteImage, onToggleLimit}
)

@reduxForm({
  form: 'house',
  //later should delete images in fields
  fields : ['city','location','roomNumber','size','price','caution','startDate','endDate',
    'description','title','owner','email','phone', 'type','note','maximumPerson', 'images',
    'username'],
  validate : submitValidation,
  //asyncValidate,
  //asyncBlurFields: ["email", "name"],
})
export default class SubmitForm extends Component {
  static propTypes = {
    entity: PropTypes.object,
    onEndEdit: PropTypes.func.isRequired,
    onAddImage : PropTypes.func.isRequired,
    onDeleteImage : PropTypes.func.isRequired,
    onChangeSlide : PropTypes.func.isRequired,
    onToggleLimit : PropTypes.func.isRequired,
    cachedImages: PropTypes.array,
    currentSlide : PropTypes.number,
    hasLimit : PropTypes.bool,

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
    if(Array.isArray(file)){
      console.log("files are array, we use the first element", file)
      file = file[0];
    }
    this.props.onAddImage(file);
  }

  onDeleteButton = () => {
    this.props.onDeleteImage(this.props.currentSlide);
  }

  render() {
    const styles = require('./SubmitForm.scss');
    const {
      fields: {location,city,roomNumber,size,price,caution,startDate,endDate,
        description,title,owner,email,phone,type,note,maximumPerson,images},
      entity,
      hasLimit,
      currentSlide,
      //resetForm,
      cachedImages,
      handleSubmit,
      submitting,
      //asyncValidating
      } = this.props;

    var anyError = location.error || city.error || roomNumber.error ||size.error || caution.error || startDate.error
      || endDate.error || description.error || title.error || email.error || phone.error || type.error
      || note.error || maximumPerson.error ;

    var logError = function(){
      console.log("error object is, ", anyError)
    }


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

    var calculateNumber = ()=> {
      return entity.images.length + cachedImages.length
    }

    return (
      <form className={styles.container} onSubmit={handleSubmit}>
        <Card className={styles.card}>
          <div className={styles.buttonContainer}>
            { currentSlide <= calculateNumber() - 1 &&
          <IconButton iconClassName="fa fa-times-circle fa-5x hint--bottom" data-hint="删除该图片" onClick={this.onDeleteButton}/>}
          </div>
          <CardMedia>
            <Carousel key={211} className={styles.slider}
                      decorators={Decorators}
                      framePadding="50px" width="100%" slidesToShow={1}
                      onChange={this.props.onChangeSlide}>
              {entity.images && entity.images.length >= 1 && entity.images.map( address =><div className={styles.imageContainer}><img src={address}/></div>)}
              {cachedImages && cachedImages.length >= 1 && cachedImages.map(file => <div className={styles.imageContainer}><img src={window.URL.createObjectURL(file)}/></div>)}
              {calculateNumber() < 3 &&
                <div className={styles.imageContainer}>
                  <DropZone onDrop={this.onDrop}>
                    <div className={styles.inner}>
                      <span className={styles.boxFont}>请点击选择图片或者将图片拖动到框中</span>
                      <span className={styles.boxFont + " fa fa-plus-circle fa-5x"}/>
                    </div>
                  </DropZone>
                </div>
              }
            </Carousel>
          </CardMedia>
          <CardTitle subtitle={entity.username} >
            <div className="hint--top" data-hint="标题">
              {/* directly display the require error here since it hard to find */}
            <TextField key={201} hintText="标题" floatingLabelText="标题" errorText={title.error ? title.error : null} {...title}/>
            </div>
          </CardTitle>
          <CardText>
            <div>
              <textarea key={202} className={"form-control " + styles.textArea} rows="6" placeholder="填写一些具体介绍吧" {...description}/>
            </div>
          </CardText>
        </Card>

        <List className={styles.list}>
          <ListItem key={1} className="hint--bottom" data-hint="城市" leftIcon={<FontIcon className="fa fa-map-marker" />} disableKeyboardFocus={true} >
            <TextField key={10} hintText="城市" floatingLabelText="城市" errorText={city.touched && city.error ? city.error : null} {...city}/>
          </ListItem>
          <ListItem key={2} className="hint--top" data-hint="地址" leftIcon={<FontIcon className="fa fa-map" />} disableKeyboardFocus={true}>
            <TextField key={20} hintText="地址" floatingLabelText="地址" errorText={location.touched && location.error ? location.error : null} {...location}/>
          </ListItem>
          <ListItem key={3} className="hint--top" data-hint="房间数" leftIcon={<FontIcon className="fa fa-codepen" />} disableKeyboardFocus={true}>
            <TextField key={30} hintText="房间数" floatingLabelText="房间数" errorText={roomNumber.touched && roomNumber.error ? roomNumber.error : null} {...roomNumber}/>
          </ListItem>
          <ListItem key={4} className="hint--top" data-hint="面积" leftIcon={<FontIcon className="fa fa-th" />} disableKeyboardFocus={true}>
            <TextField key={40} hintText="面积" floatingLabelText="面积" errorText={size.touched && size.error ? size.error : null} {...size}/>
          </ListItem>
          <ListItem key={5} className="hint--top" data-hint="租金" leftIcon={<FontIcon className="fa fa-euro" />} disableKeyboardFocus={true}>
            <TextField key={50} hintText="租金" floatingLabelText="租金" errorText={price.touched && price.error ? price.error : null} {...price}/>
          </ListItem>
          <ListItem key={6} className="hint--top" data-hint="押金" leftIcon={<FontIcon className="fa fa-money" />} disableKeyboardFocus={true}>
            <TextField key={60} hintText="押金" floatingLabelText="押金" errorText={title.caution && title.caution ? title.error : null} {...caution}/>
          </ListItem>
          <ListItem key={7} className="hint--top" data-hint="最多人数" leftIcon={<FontIcon className="fa fa-child" />} disableKeyboardFocus={true}>
            <TextField key={70} hintText="最多人数" floatingLabelText="最多人数" errorText={title.maximumPerson && title.maximumPerson ? title.error : null} {...maximumPerson}/>
          </ListItem>
          <ListItem key={14} className="hint--top" data-hint="类型" leftIcon={<FontIcon className="fa fa-home" />} disableKeyboardFocus={true}>
            <SelectField key={141} value={type.value} onChange={(event, value) => {
            console.log('value is', value)
            type.onChange(value);
            }}>
              <MenuItem value={0} primaryText="整套公寓"/>
              <MenuItem value={1} primaryText="单间"/>
            </SelectField>
          </ListItem>

          <ListItem key={8} className="hint--top" data-hint="开始结束日期" leftIcon={<FontIcon className="fa fa-calendar" />} disableKeyboardFocus={true} children={
            <div key={83}>
            {/*every child should have a key, or react give a stupid warnning */}
              <DatePicker key={81} autoOk={true} value={new Date(startDate.value)} hintText="开始日期"
              onChange={(event, newDate) => startDate.onChange(newDate)} formatDate={this.dateFormat}/>
              <Toggle label="短期" toggled={hasLimit} labelPosition="right" onToggle={(event, isToggled) => {
                this.props.onToggleLimit(isToggled)
                if(isToggled){
                  endDate.onChange(new Date())
                }else{
                  endDate.onChange(null)
                }
              }}/>
              { hasLimit &&
                <DatePicker key={82} autoOk={true} value={new Date(endDate.value)} hintText="结束日期"
                onChange={(event, newDate) => endDate.onChange(newDate)} formatDate={this.dateFormat}/>
              }
            </div>
          }>


          </ListItem >
          <ListItem key={9} className={styles.note} zDepth={2} className="hint--top" data-hint="备注" disableKeyboardFocus={true}>
            <TextField key={90} hintText="备注" floatingLabelText="备注" errorText={note.touched && note.error ? note.error : null} {...note}/>
          </ListItem>
          <ListItem key={11} className="hint--top" data-hint="邮箱" leftIcon={<FontIcon className="fa fa-envelope-o" />} disableKeyboardFocus={true}>
            <TextField key={110} hintText="邮箱" floatingLabelText="邮箱" errorText={email.touched && email.error ? email.error : null} {...email}/>
          </ListItem>
          <ListItem key={12} className="hint--top" data-hint="手机" leftIcon={<FontIcon className="fa fa-mobile-phone" />} disableKeyboardFocus={true}>
            <TextField key={120} hintText="手机" floatingLabelText="地址" errorText={phone.touched && phone.error ? phone.error : null} {...phone}/>
          </ListItem>
          {/* <RaisedButton key={15} className={styles.editButton} onClick={logError}><span className="fa fa-pencil"/> logError</RaisedButton>*/}
          <RaisedButton key={13} disabled={anyError ? true : false} className={styles.editButton} onClick={handleSubmit}><span className="fa fa-pencil"/> 保存</RaisedButton>
        </List>
      </form>
    );
  }
}