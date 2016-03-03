/**
 * Created by hanwencheng on 2/10/16.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {isLoaded, onLoad, onLocationChange, onDeleteHouse, onClearDeleteFeedback} from 'redux/modules/admin';
import {bindActionCreators} from 'redux';
import connectData from 'helpers/connectData';
import {List} from "components";
import Helmet from 'react-helmet';
import uiStyles from '../../theme/uiStyles';
import { Link } from 'react-router';
import {FlatButton, FontIcon, Snackbar} from 'material-ui';

import {DropDownMenu, MenuItem,RaisedButton} from 'material-ui';


function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    //console.log("after load we get state:", getState().router)
    return dispatch(onLoad(getState().auth.user._id));
  }
}

@connectData(null, fetchDataDeferred)

@connect(
  state => ({
    userId : state.auth.user._id,
    entities: state.admin.list,
    error: state.admin.error,
    loading: state.admin.loading,
    loaded: state.admin.loaded,
    locationId : state.admin.locationId,
    deleteFeedback : state.admin.deleteFeedback,
  }),
  {onLoad, onLocationChange, onDeleteHouse, onClearDeleteFeedback}
)
export default class Entities extends Component {
  static propTypes = {
    entities : PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    locationId : PropTypes.number,
    loaded :PropTypes.bool,
    userId : PropTypes.string,
    deleteFeedback : PropTypes.string,

    onDeleteHouse : PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired,
    onLocationChange: PropTypes.func.isRequired,
    onClearDeleteFeedback : PropTypes.func.isRequired,
  };

  loadList = (event) => {
      event.preventDefault();
      this.props.onLoad(this.props.userId);
  }

  render() {
    const styles = require('./UserAdmin.scss');
    const {loaded, error, loading, deleteFeedback} = this.props;
    const houses = this.props.entities;

    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }

    return (
      <div>
        <Helmet title="我的发布"/>
        {loaded && houses.length > 0 &&
        <div className={styles.listNav}>
          <RaisedButton onClick={this.loadList} style={{lineHeight: "36px" }}>
            <i className={refreshClassName}/>刷新
          </RaisedButton>
        </div>
        }

        {loaded &&
        <div className={styles.gridContainer}>
          { houses.length ?
            <List houses={this.props.entities} onDeleteHouse={this.props.onDeleteHouse}/>
            :
            <div className={styles.noHouseYet}>
              <div className={styles.textHint}>
                <p>Ooops! 您还没有发布任何房源。</p>
              </div>
              <div className={styles.raisedButton}>
                <RaisedButton linkButton={true} containerElement={<Link to="/submit" />} label="开始发布我的第一个房屋"/>
              </div>
            </div>
          }
        </div>
        }

        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true">sorry</span>
          {' '}
          {error}
        </div>}

        <Snackbar
          open={deleteFeedback != null}
          message={ deleteFeedback != null ? deleteFeedback : null}
          autoHideDuration={4000}
          bodyStyle={uiStyles.snackBarStyleBlue}
          onRequestClose={(reason) => {
            this.props.onClearDeleteFeedback()
          }}
        />
      </div>
    );
  }
}