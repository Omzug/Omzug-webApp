/**
 * Created by hanwencheng on 2/6/16.
 */
import React, {Component, PropTypes} from 'react';

var createDecorates = function(prev, next){
  return [
    {
      component: React.createClass({
        render() {
          return (
            <i onClick={prev} className="fa fa-arrow-left"/>
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
            <i onClick={next} className="fa fa-arrow-right"/>
          )
        }
      }),
      position: 'CenterRight',
      style: {
        padding: 20
      }
    }

  ];
}

export default createDecorates;
