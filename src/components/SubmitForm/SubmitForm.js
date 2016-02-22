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
import uiStyles from '../../theme/uiStyles'
import Select from 'react-select';

import {TextField, FontIcon, RaisedButton, Card, MenuItem,
  IconButton, CardMedia, CardTitle, CardText, List, ListItem, SelectField,
  DatePicker, Toggle, RadioButton, RadioButtonGroup} from 'material-ui';

import DropZone from 'react-dropzone'
import defaultCityList from '../../constant/cityList';

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
    require('../../theme/react-select.css')
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

    const errorStyle = (value) =>{
      const withOutError = styles.withOutError
      const withError = " "+ styles.withError
      return value.error && value.touched? withError : withOutError
    }

    const onCityChange =(value)=>{
      if(value === ""){
        return city.onChange(null)
      }
      city.onChange(defaultCityList[value].label)
    }

    /*<List>

     <ListItem key={8} leftIcon={<FontIcon className="fa fa-calendar" />} disableKeyboardFocus={true} children={
     <div key={83}>
     {/*every child should have a key, or react give a stupid warnning
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
     <ListItem key={9} className={styles.note} zDepth={2} disableKeyboardFocus={true}>
     <TextField key={90} hintText="备注" floatingLabelText="备注" errorText={note.touched && note.error ? note.error : null} {...note}/>
     </ListItem>
     <ListItem key={11} leftIcon={<FontIcon className="fa fa-envelope-o" />} disableKeyboardFocus={true}>
     <TextField key={110} hintText="邮箱" floatingLabelText="邮箱" errorText={email.touched && email.error ? email.error : null} {...email}/>
     </ListItem>
     <ListItem key={12} leftIcon={<FontIcon className="fa fa-mobile-phone" />} disableKeyboardFocus={true}>
     <TextField key={120} hintText="手机" floatingLabelText="手机" errorText={phone.touched && phone.error ? phone.error : null} {...phone}/>
     </ListItem>
     {/* <RaisedButton key={15} className={styles.editButton} onClick={logError}><span className="fa fa-pencil"/> logError</RaisedButton>
     <RaisedButton key={13} disabled={anyError ? true : false} className={styles.editButton} onClick={handleSubmit}><span/> 提交</RaisedButton>
     </List>*/

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
          <CardTitle>
              {/* directly display the require error here since it hard to find */}
            <TextField key={201} hintText="标题" floatingLabelText="标题" errorText={title.error ? title.error : null} {...title}/>
          </CardTitle>
          <CardText>
              <textarea key={202} className={"form-control " + styles.textArea} rows="6" placeholder="填写一些具体介绍吧" {...description}/>
          </CardText>
        </Card>

        <div className={styles.list}>
          <div>
            <div className={styles.rowContainerCity}>
              <div className={styles.chengShi}><i className="fa fa-location-arrow"/> 城市 :</div>
              <Select
                className={styles.select}
                name="selectPostCity"
                options={defaultCityList}
                value={city.value === null ? "" : city.value}
                onChange={onCityChange}
                noResultsText={"暂时不支持你选择的地区,请选择附近的城市"}
                placeholder={"选择所在的城市"}
                ignoreAccents={false}
              />
            </div>

            <div className={styles.rowContainer}>
              <div className={errorStyle(location)}><i className="fa fa-map-marker"/> 地址 :</div>
              <div><TextField key={20}  floatingLabelText=" " errorText={location.touched && location.error ? location.error : null} {...location}/></div>
            </div>

            <div className={styles.rowContainer}>
              <div className={errorStyle(size)}><i className="fa fa-square"/> 面积 :</div>
              <div><TextField key={40}  floatingLabelText=" " errorText={size.touched && size.error ? size.error : null} {...size}/></div>
            </div>

            <div className={styles.rowContainer}>
              <div className={errorStyle(price)}><i className="fa fa-eur"/> 租金 :</div>
              <div><TextField key={50}  floatingLabelText=" " errorText={price.touched && price.error ? price.error : null} {...price}/></div>
            </div>

            <div className={styles.rowContainer}>
              <div className={errorStyle(caution)}><i className="fa fa-lock"/> 押金 :</div>
              <div><TextField key={60}  floatingLabelText=" " errorText={caution.touched && caution.error ? caution.error : null} {...caution}/></div>
            </div>


              <div className={styles.buttonGroup1}>
                <RadioButtonGroup name="costType" style={uiStyles.buttonGroup}>
                  <RadioButton
                    value="warm"
                    label="暖租"
                    style={uiStyles.warmCold}
                    labelStyle={uiStyles.warmCold}
                  />
                  <RadioButton
                    value="cold"
                    label="冷租"
                    style={uiStyles.warmCold}
                    labelStyle={uiStyles.warmCold}
                  />
                </RadioButtonGroup>
              </div>
            <div className={styles.buttonGroup2}>
              <RadioButtonGroup name="costType" style={uiStyles.buttonGroup}>
                <RadioButton
                  value="wg"
                  label="WG"
                  style={uiStyles.warmCold}
                  labelStyle={uiStyles.warmCold}
                />
                <RadioButton
                  value="wohnung"
                  label="Wohnung/Appartment"
                  style={uiStyles.warmCold}
                  labelStyle={uiStyles.warmCold}
                />
              </RadioButtonGroup>
            </div>
            <div className={styles.rowContainer}>
              <div className={errorStyle(email)}><i className="fa fa-envelope"/> 邮箱 :</div>
              <div><TextField key={110}  floatingLabelText=" " errorText={email.touched && email.error ? email.error : null} {...email}/></div>
            </div>
            <div className={styles.rowContainer}>
              <div className={errorStyle(phone)}><i className="fa fa-phone"/> 手机 :</div>
              <div><TextField key={120}  floatingLabelText=" " errorText={phone.touched && phone.error ? phone.error : null} {...phone}/></div>
            </div>
            <div className={styles.submit}>
              <RaisedButton key={13} disabled={anyError ? true : false} className={styles.editButton} onClick={handleSubmit}><span/> 提交</RaisedButton>
            </div>
          </div>
        </div>
      </form>
    )
  }
}
