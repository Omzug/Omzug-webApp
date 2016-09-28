/**
 * Created by hanwencheng on 3/5/16.
 */

import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import postValidation from './postValidation'
import {capitalizeFirstLetter, findCityValue} from '../../utils/help';

import {onEndEdit, onAddImage, onChangeSlide,
  onDeleteImage, onToggleLimit, onChangeType, onChangePriceType, onLogError} from "redux/modules/post";
import {Carousel} from 'components';
import submitValidation from './postValidation'
import uiStyles from '../../theme/uiStyles'
import Select from 'react-select';
import strings from '../../constant/strings';
import {onSetError} from 'redux/modules/error';

import {TextField, FontIcon, RaisedButton, Card, MenuItem,
  IconButton, CardMedia, CardTitle, CardText, List, ListItem, SelectField,
  DatePicker, Toggle, RadioButton, RadioButtonGroup} from 'material-ui';

import config from '../../config'
import DropZone from 'react-dropzone'
import defaultCityList from '../../constant/cityList';

@connect(
  state => ({
    post: state.post.data,
    hasLimit : state.post.hasLimit,
    initialValues : state.post.data,
    cachedImages : state.post.cachedImages,
    currentSlide : state.post.currentSlide,
  }),
  {onEndEdit, onAddImage, onChangeSlide, onDeleteImage, onToggleLimit, onChangeType, onChangePriceType, onLogError, onSetError}
)

@reduxForm({
  form: 'post',
  //later should delete images in fields
  fields : [  'city', 'description', 'startDate','endDate','major','gender','email','phone','wechat'],
  validate : postValidation,
})

export default class PostForm extends Component {
  static propTypes = {
    post: PropTypes.object,
    onEndEdit: PropTypes.func.isRequired,
    onAddImage : PropTypes.func.isRequired,
    onDeleteImage : PropTypes.func.isRequired,
    onChangeSlide : PropTypes.func.isRequired,
    onToggleLimit : PropTypes.func.isRequired,
    onChangeType : PropTypes.func.isRequired,
    onLogError : PropTypes.func.isRequired,
    onChangePriceType : PropTypes.func.isRequired,
    onSetError : PropTypes.func.isRequired,
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
    return year + "." + month + "." + day
    //return day + '/' + month + '/' + year;
  }

  calculateNumber = ()=> {
    return this.props.post.images.length + this.props.cachedImages.length
  }

  onDrop = (files) => {
    if(!Array.isArray(files)){
      files = [files];
    }else{
      if(files.length + this.calculateNumber()> config.limitImageNumber){
        files = files.slice(0, config.limitImageNumber - this.calculateNumber())
        this.props.onSetError(strings.maxNumberImageError);
      }
    }
    this.props.onAddImage(files);
  }

  onDeleteButton = () => {
    this.props.onDeleteImage(this.props.currentSlide);
  }

  render() {
    require('../../theme/react-select.css')
    const styles = require('./PostForm.scss');
    const {
      fields: {location,city,startDate,endDate,
        description,owner,email,phone, images,  major, gender, wechat},
      post,
      hasLimit,
      currentSlide,
      //resetForm,
      cachedImages,
      handleSubmit,
      submitting,
      //asyncValidating
      } = this.props;

    var Decorators = [
      {component: React.createClass({render() {
        return (
          <div className={styles.arrowContainer1} onClick={this.props.previousSlide}>
            <i className={styles.arrowIcon + " fa fa-angle-left fa-2x"}/>
          </div>)}
      }),
        position: 'CenterLeft', style: {height: "100%"}},
      {component: React.createClass({render() {
        return (
          <div className={styles.arrowContainer1} onClick={this.props.nextSlide}>
            <i className={styles.arrowIcon + " fa fa-angle-right fa-2x"}/>
          </div>)}
      }),
        position: 'CenterRight', style: {height: "100%"}},
    ];

    const pickerStyle ={
      display:'inline'
    }

    //Deprecated
    const errorStyle = (value) =>{
      const withOutError = styles.withOutError
      const withError = " "+ styles.withError
      return value.error && value.touched? withError : withOutError
    }

    const onCityChange =(selectObject)=>{
      var value = selectObject ? selectObject.value : null ;
      if(value === ""){
        return city.onChange(null)
      }
      city.onChange(value !== null ? selectObject.label : null)
    }

    const inputStyle250Width = { width : "250px"}

    const validateSubmit = (data)=> {
      var fields = this.props.fields;
      //console.log('fields is', fields)
      var anyError = []
      for (var property in fields){
        if(fields.hasOwnProperty(property)){
          if(fields[property].error){
            anyError.push(property )
          }
        }
      }
      if(anyError.length){
        return this.props.onLogError("未填写"  + anyError.join(", "));
      }
      handleSubmit(data)
    }

    return (
      <form className={styles.container} onSubmit={validateSubmit}>

        <Card className={styles.card}>
          <div className={styles.buttonContainer}>
            { currentSlide <= this.calculateNumber() - 1 &&
            <IconButton iconClassName="fa fa-times-circle" tooltip={strings.deleteImageTooltip}  touch={true}
                        style={{"width" : "60px", "height": "60px"}}
                        iconStyle = {{"fontSize" : "30px"}}
                        tooltipPosition="top-center" onClick={this.onDeleteButton}/>}
          </div>
          <CardMedia>
            <Carousel key={211} className={styles.slider}
                      decorators={Decorators}
                      framePadding="50px" width="100%" slidesToShow={1}
                      onChange={this.props.onChangeSlide}>
              {post.images && post.images.length >= 1 && post.images.map( address =><div className={styles.imageContainer} key={address + "show"}><img src={address}/></div>)}
              {cachedImages && cachedImages.length >= 1 && cachedImages.map(file => <div className={styles.imageContainer} key={file.name + "cache"}><img src={window.URL.createObjectURL(file)}/></div>)}
              {this.calculateNumber() < config.limitImageNumber &&
              <div className={styles.imageContainer}>
                <DropZone onDrop={this.onDrop}>
                  <div className={styles.inner}>
                    <div className={styles.innerText}>请点击选择图片或将图片拖动到框中,<font color="#FF6F6F">最多上传<b><font>{config.limitImageNumber}</font></b>张图片</font></div>
                    <div className={styles.innerFont}>
                      <span className="fa fa-plus-circle fa-5x"/>
                    </div>
                  </div>
                </DropZone>
              </div>
              }
            </Carousel>
          </CardMedia>
          <CardText style={uiStyles.cardText}>
            <textarea key={202} className={"form-control " + styles.textArea} rows="8" placeholder="填写一些具体介绍吧" {...description}/>
          </CardText>
        </Card>

        <div className={styles.list}>
          <div className={styles.innerList}>

            <div className={styles.rowContainerCity}>
              <div className={styles.city}><i className="fa fa-location-arrow"/> 城市 :</div>
              <Select
                className={styles.select}
                name="selectPostCity"
                options={defaultCityList}
                value={city.value === null ? "" : findCityValue(defaultCityList, city.value)}
                onChange={onCityChange}
                noResultsText={strings.selectNoResultsSubmit}
                placeholder={strings.selectPlaceholderSubmit}
                ignoreAccents={false}
              />
            </div>

            <div className={styles.rowContainer}>
              <div><TextField key={22} style={inputStyle250Width} hintText="专业" {...major}/></div>
            </div>

            <div className={styles.rowContainerDate}>
              <div className={styles.radioContainer}>
                <RadioButtonGroup name="costType" style={uiStyles.buttonGroup}
                                  valueSelected={gender.value == null ? null : gender.value.toString()}
                                  onChange={(event, value)=> {
                 var boolean = value === "true"
                 console.log('change value is', value)
                 gender.onChange(boolean)}}
                >
                  <RadioButton
                    value="true"
                    label="女"
                    style={uiStyles.warmCold}
                    labelStyle={uiStyles.warmCold}
                  />
                  <RadioButton
                    value="false"
                    label="男"
                    style={uiStyles.warmCold}
                    labelStyle={uiStyles.warmCold}
                  />
                </RadioButtonGroup>
              </div>
            </div>

            {/* the width should be 265px */}
            <div className={styles.rowContainerDate}>
              <DatePicker key={81} autoOk={true} value={new Date(startDate.value)} hintText="开始日期" textFieldStyle={uiStyles.datePicker}
                          onChange={(event, newDate) => startDate.onChange(newDate)} formatDate={this.dateFormat}/>
              <Toggle label={hasLimit ? "短期" : "长期"} toggled={hasLimit} labelPosition="right" style={uiStyles.toggle} onToggle={(event, isToggled) => {
                 this.props.onToggleLimit(isToggled)
                 if(isToggled){
                 endDate.onChange(new Date())
                 }else{
                 endDate.onChange(null)
                 }
                 }}/>
              { hasLimit &&
              <DatePicker key={82} autoOk={true} value={new Date(endDate.value)} hintText="结束日期" textFieldStyle={uiStyles.datePicker}
                          onChange={(event, newDate) => endDate.onChange(newDate)} formatDate={this.dateFormat}/>
              }
            </div>

            <div className={styles.rowContainer}>
              <div><TextField key={23} style={inputStyle250Width} hintText="手机" {...phone}/></div>
            </div>
            <div className={styles.rowContainer}>
              <div><TextField key={24} style={inputStyle250Width} hintText="邮箱" {...email}/></div>
            </div>
            <div className={styles.rowContainer}>
              <div><TextField key={25} style={inputStyle250Width} hintText="微信" {...wechat}/></div>
            </div>
            <div className={styles.submit}>
              <RaisedButton style={uiStyles.buttonStyle} key={13} className={styles.editButton} onClick={validateSubmit}><span/> 提交</RaisedButton>
            </div>
          </div>
        </div>
      </form>
    )
  }
}
