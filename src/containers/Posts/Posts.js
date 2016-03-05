/**
 * Created by hanwencheng on 3/5/16.
 */

/**
 * Created by hanwencheng on 2/10/16.
 */
import React, {Component, PropTypes} from 'react';
import {GridList, GridTile, Dialog, IconButton, FlatButton, TextField} from 'material-ui';
import {reduxForm} from 'redux-form';
import {Carousel} from 'components';
import { LinkContainer } from 'react-router-bootstrap';
import {onOpenDialog, onCloseDialog , onSetColumn, onStartEdit, onDeletePost, onCityChange} from 'redux/modules/posts';
import {connect} from 'react-redux';
import postValidation from './postValidation'

import uiStyles from '../../theme/uiStyles'
var config = require('../../config');
import cityList from '../../constant/cityList'
import strings from '../../constant/strings'

@reduxForm({
  form: 'post',
  //later should delete images in fields
  fields : [  'city', 'title' , 'description', 'startDate','email','phone','wechat'],
  validate : postValidation,
})

@connect(
  state => ({
    posts: state.posts.list,
    popover : state.posts.popover,
    toDelete : state.posts.toDelete,
    column : state.posts.column,
    error: state.posts.error,
    loading: state.posts.loading,
    loaded: state.posts.loaded,
    editing : state.posts.editing,

    user: state.auth.user,
    isEnd : state.posts.isEnd,
    loadingCity : state.posts.loadingCity,
    locationId : state.posts.locationId,
    deleteFeedback : state.entities.deleteFeedback,
  }),
  {onOpenDialog, onCloseDialog, onStartEdit, onSetColumn, onCityChange}
)
export default class List extends Component {
  static propTypes = {
    posts : PropTypes.array,
    popover : PropTypes.bool,
    toDelete : PropTypes.object,
    column : PropTypes.number,
    //from parent
    editing : PropTypes.bool,
    user : PropTypes.object,
    isEnd : PropTypes.bool,
    loadingCity : PropTypes.bool,
    locationId : PropTypes.number,
    deleteFeedback : PropTypes.string,
    error: PropTypes.string,
    loading: PropTypes.bool,
    loaded :PropTypes.bool,

    onDeletePost: PropTypes.func.isRequired,
    onOpenDialog : PropTypes.func.isRequired,
    onCloseDialog : PropTypes.func.isRequired,
    onStartEdit :PropTypes.func.isRequired,
    onSetColumn : PropTypes.func.isRequired,
  };

  handleResize = (event) => {
    if(window.innerWidth <= 600){
      if(this.props.column !== 1)
      //console.log( 'window inner width is', window.innerWidth, 'now set column to 1');
        this.props.onSetColumn(1)
    }else if(window.innerWidth <= 1200){
      if(this.props.column !== 2)
      //console.log( 'window inner width is', window.innerWidth, 'now set column to 2');
        this.props.onSetColumn(2)
    }else if(window.innerWidth <= 1800){
      if(this.props.column !== 3)
      //console.log( 'window inner width is', window.innerWidth, 'now set column to 3');
        this.props.onSetColumn(3)
    }else if(window.innerWidth <= 2400){
      if(this.props.column !== 4)
      //console.log( 'window inner width is', window.innerWidth, 'now set column to 4');
        this.props.onSetColumn(4)
    }
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render(){
    const margin = 3; //percent
    const marginPercentage = margin.toString() + "%"
    var tileWidth = (Math.floor(100 / this.props.column) - margin * 2).toString() + "%";
    const styles = require('./Posts.scss');
    const {onDeleteHouse, onOpenDialog, onCloseDialog, toDelete, column} = this.props;
    const {posts, user,
      fields: {city,description, email,phone, wechat},
      } = this.props;

    const cities = cityList.map(function(cityObject){
      return cityObject.label
    })

    const deleteHouse = (event) => {
      onCloseDialog(event);
      if(toDelete){
        onDeleteHouse(this.props.user._id, toDelete.post._id, toDelete.index)
      }
    }

    const startEdit = (event) => {
      this.props.onStartEdit()
    }

    const saveIndex = (post, index, event) => {
      onOpenDialog(post, index)
    }

    const renderIcon = (post, index) => {
      const iconStyle = {"color" : "white"}
      if(this.props.user && post.owner === this.props.user._id){
        return(
          <span className={styles.buttonGroup}>
            <LinkContainer to={`/entities/${post._id}`}>
              <IconButton iconClassName="fa fa-pencil" onClick={startEdit} iconStyle={iconStyle}/>
            </LinkContainer>
            <IconButton iconClassName="fa fa-trash" onClick={saveIndex.bind(this, post, index)} iconStyle={iconStyle}/>
            <Dialog
              title="确认删除"
              actions={[
                <FlatButton
                  label="取消"
                  onClick={onCloseDialog}
                />,
                <FlatButton
                  label="删除"
                  onClick={deleteHouse}
                  labelStyle={uiStyles.dialogConfirmStyle}
                />,
              ]}
              modal={false}
              open={this.props.popover}
              onRequestClose={onCloseDialog}
            >
              确认要删除?
            </Dialog>
          </span>
        )
      }else{
        return
      }
    }

    const onCityChange =(value)=>{
      if(value === ""){
        return city.onChange(null)
      }
      city.onChange(cities[value])
    }

    const listNavClass = this.props.user ? styles.listNav : styles.listNavBeforeLogin;
    const inputStyle250Width = { width : "250px"}

    return (
      <div className={styles.gridList}>
        <Helmet title="求房列表"/>
        <div className={listNavClass}>
          <div className={styles.select}>
            <Select
              name="selectCity"
              options={cities}
              value={locationId === null || !cities.length ? "" : cities[locationId]}
              onChange={this.onSelectChange}
              noResultsText={strings.selectNoResults}
              placeholder={strings.selectPlaceholder}
            />
          </div>
        </div>
        <div className={styles.myList}>
          <GridTile
            className={styles.tile}
            key={this.props.user ? user._id : "newPost"}
            style={{
              "display" : "flex", "alignItems":"center", "justifyContent": "center",
               height: "300px", width : tileWidth, margin : marginPercentage}}
          >
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
                <div className={styles.rowContainerCity}>
                  <div className={styles.city}><i className="fa fa-location-arrow"/> 城市 :</div>
                  <Select
                    className={styles.select}
                    name="selectPostCity"
                    options={cities}
                    value={city.value === null ? "" : city.value}
                    onChange={onCityChange}
                    noResultsText={strings.selectNoResultsSubmit}
                    placeholder={strings.selectPlaceholderSubmit}
                    ignoreAccents={false}
                  />
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
              </Dialog>
            </div>

          </GridTile>
          {posts.map((post, index) => (
            <GridTile
              className={styles.tile}
              key={post._id}
              style={{
              "display" : "flex", "alignItems":"center", "justifyContent": "center",
               height: "300px", width : tileWidth, margin : marginPercentage}}
              title={post.title}
              subtitle={
                post.username == "weibo"
                ?
                <span>from  新浪微博&nbsp;<i className={"fa fa-weibo"}/> in <b className={styles.cityColor}> {post.city}</b> </span>
                :
                <span>
                  by <b className={styles.usernameColor}>{post.username}</b> In <b className={styles.cityColor}>
                  {post.city}</b>
                </span>
              }
              actionIcon={renderIcon(post, index)}
            >
              <Carousel key={post._id} className={styles.carousel} width={"100%"}
                        initialSlideHight={300} initialSlideWidth={500}>
                {post.description}
              </Carousel>
            </GridTile>
          ))
          }
        </div>
      </div>
    )
  }
}