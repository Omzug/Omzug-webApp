/**
 * Created by hanwencheng on 3/7/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import uiStyles from '../../theme/uiStyles';
import {onContactOpen, onContactClose, onStartEdit} from "redux/modules/post";
import {onSetError} from 'redux/modules/error';
import {Carousel} from 'components';
import {RaisedButton, FlatButton, FontIcon, Paper, Dialog, Card, CardActions,
  CardHeader, CardMedia, CardTitle, CardText, List, ListItem, Divider, TextField} from 'material-ui';
import strings from '../../constant/strings';
var config = require('../../config');

@connect(
  state => ({
    post: state.post.data,
    contactOpen : state.post.contactOpen,
    cachedImages : state.post.cachedImages,
    user : state.auth.user,
    searchValue : state.post.searchValue,
  }),
  {onContactOpen, onContactClose, onStartEdit, onSetError}
)
export default class PostTemplate extends Component {
  static propTypes = {
    post: PropTypes.object,
    contactOpen : PropTypes.bool,
    cachedImages: PropTypes.array,
    user : PropTypes.object,
    searchValue :PropTypes.string,

    onSetError : PropTypes.func.isRequired,
    onContactOpen : PropTypes.func.isRequired,
    onContactClose : PropTypes.func.isRequired,
    onStartEdit : PropTypes.func.isRequired,

    nextSlide :PropTypes.func,
    previousSlide : PropTypes.func,
  }

  render() {
    const styles = require('./PostTemplate.scss');
    const {post, contactOpen, cachedImages, user, searchValue} = this.props;

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

    const onContactClick = (event) => {
      if(user){
        this.props.onContactOpen()
      }else{
        this.props.onSetError(strings.requireLoginError);
      }
    }

    const formatDate = (dateString) =>
    {
      const date = new Date(dateString)
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return year + "." + month + "." + day
      //return day + '/' + month + '/' + year;
    }

    const containerClass = this.props.user ? styles.container : styles.containerBeforeLogin;

    const renderWeiboName = () => {
      if(post.description){
        var descriptionArray = post.description.split("&&")
        if(descriptionArray.length < 3){
          return post.description
        }else{
          var originalText = descriptionArray[0]
          var weiboName = descriptionArray[1]
          var weiboId = descriptionArray[2]
          var weiboLink = "http://www.weibo.com/p/" + weiboId

          return <span>
                  {originalText}<span><i className="fa fa-weibo"/><a href={weiboLink} target="_blank">{weiboName}</a></span>
                </span>
        }
      }else{
        return ""
      }
    }

    return (
      <div className={containerClass}>
        <div className={styles.card}>

          <div className={styles.cardMedia}>
            <div className={styles.cardPhoto}>
              <Carousel className={styles.carousel} decorators={Decorators} framePadding="32px" width="100%" slidesToShow={1}>
                {post.images.length >= 1 && post.images.map(address => (<div className={styles.imageContainer} key={address + "show"}><img src={address}/></div>))}
                {cachedImages.length >= 1 && cachedImages.map(file => <div className={styles.imageContainer} key={address + "cache"}><img src={window.URL.createObjectURL(file)}/></div>)}
                {post.images.length == 0 && cachedImages.length == 0 &&  <div className={styles.imageContainer}><img src={config.noImagePath}/></div>}
              </Carousel>
            </div>

            <div className={styles.cardTitle}>
              <div className={styles.cardTitleTitle}>{post.title ? post.title : ""}</div>
              {post.username == "weibo"
                ?
                <div className={styles.cardTitleUsername}>from <a href="http://www.weibo.com/omzug" target="_blank">新浪微博</a>&nbsp;<i className={"fa fa-weibo"}/></div>
                :
                <div className={styles.cardTitleUsername}>by {post.username ? post.username : ""}</div>
              }
            </div>

            <div className={styles.cardText}>
              {renderWeiboName()}
            </div>


            <div className={styles.cardActions}>
              <div className={styles.contactHost}>
                <FlatButton style={uiStyles.actionButton} onClick={onContactClick}><span className="fa fa-envelope"/> 联系方式</FlatButton>
              </div>
            </div>
          </div>

        </div>
        <div className={styles.list}>
          <div className={styles.innerList}>
            <div className={styles.rowContainer}><i className="fa fa-location-arrow"/> 城市 : &nbsp;&nbsp;  {post.city ? post.city : ""}</div>
            <div className={styles.rowContainer}><i className="fa fa-cube"/> 专业 : &nbsp;&nbsp;  {post.major ? post.major : ""}</div>
            <div className={styles.rowContainer}><i className="fa fa-eur"/> 性别 : &nbsp;&nbsp; {(post.gender ? "女" : "男" )}</div>
            <div className={styles.rowContainer}><i className="fa fa-calendar"/> 租期 : &nbsp;&nbsp; {formatDate(post.startDate)} &nbsp;-- &nbsp;{post.endDate ? formatDate(post.endDate) : "无期限"  } </div>
            {user && user._id && user._id == post.owner &&
            <RaisedButton style={uiStyles.buttonStyleEdit} key={12} className={styles.editButton} onClick={this.props.onStartEdit}><span
              className="fa fa-pencil"/> 编辑</RaisedButton>
            }
          </div>
        </div>

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
              <div className={styles.infoTitle}> {post.username ? post.username : ""}的联系方式:</div>
              <div className={styles.infoListMail}> <i className="fa fa-envelope-o" />  邮箱: &nbsp; {post.email ? post.email : ""} </div>
              <div className={styles.infoListWechat}> <i className="fa fa-wechat" />  微信: &nbsp; {post.wechat ? post.wechat : ""} </div>
              <div className={styles.infoListPhone}> <i className="fa fa-phone" />  手机: &nbsp; {post.phone ? post.phone : ""} </div>
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}


