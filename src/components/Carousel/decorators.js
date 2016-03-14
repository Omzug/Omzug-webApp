'use strict';

import React from 'react';
const styles = require('../List/List.scss');

const DefaultDecorators = [
  {
    component: React.createClass({
      render() {
        return (
          <div className={styles.arrowContainer} onClick={this.props.previousSlide}>
            <i className={styles.arrowIcon + " fa fa-angle-left fa-2x"}/>
          </div>
        )
      },
      getButtonStyles(disabled) {
        return {
          border: 0,
          background: 'rgba(0,0,0,0.4)',
          color: 'white',
          padding: 10,
          outline: 0,
          opacity: disabled ? 0.3 : 1,
          cursor: 'pointer'
        }
      }
    }),
    position: 'CenterLeft',style: {height: "100%"}
  },
  {
    component: React.createClass({
      render() {
        return (
          <div className={styles.arrowContainer} onClick={this.props.nextSlide}>
            <i className={styles.arrowIcon + " fa fa-angle-right fa-2x"}/>
          </div>
        )
      },
      getButtonStyles(disabled) {
        return {
          border: 0,
          background: 'rgba(0,0,0,0.4)',
          color: 'white',
          padding: 10,
          outline: 0,
          opacity: disabled ? 0.3 : 1,
          cursor: 'pointer'
        }
      }
    }),
    position: 'CenterRight', style: {height: "100%"}
  },
  {
    component: React.createClass({
      render() {
        var self = this;
        var indexes = this.getIndexes(self.props.slideCount, self.props.slidesToScroll);
        return (
          <ul style={self.getListStyles()}>
            { self.props.slideCount > 1 &&
              indexes.map(function(index) {
                return (
                  <li style={self.getListItemStyles()} key={index}>
                    <button
                      style={self.getButtonStyles(self.props.currentSlide === index)}
                      onClick={self.props.goToSlide.bind(null, index)}>
                      &bull;
                    </button>
                  </li>
                )
              })
            }
          </ul>
        )
      },
      getIndexes(count, inc) {
        var arr = [];
        for (var i = 0; i < count; i += inc) {
          arr.push(i);
        }
        return arr;
      },
      getListStyles() {
        return {
          position: 'relative',
          margin: 0,
          top: 10,
          padding: 0
        }
      },
      getListItemStyles() {
        return {
          listStyleType: 'none',
          display: 'inline-block'
        }
      },
      getButtonStyles(active) {
        return {
          border: 0,
          background: 'transparent',
          color: active ? "grey" : "#F0F0F0",
          cursor: 'pointer',
          padding: 5,
          outline: 0,
          fontSize: 24,
          opacity: 0.7,
        }
      }
    }),
    position: 'TopCenter'
  }
];

export default DefaultDecorators;
