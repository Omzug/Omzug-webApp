/**
 * Created by hanwencheng on 1/6/16.
 */

import React, {Component, PropTypes} from 'react';

export default class Entity extends Component{
  componentDidMount() {
    this.setState({
      // route components are rendered with useful information, like URL params
      user: findUserById(this.props.params.userId)
    })
  };

  render (){
    return (
      <div>
        <h2>{this.state.user.name}</h2>
      </div>
    )
  }
}
