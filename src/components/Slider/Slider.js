/**
 * Created by hanwencheng on 2/1/16.
 */

import React, {Component, PropTypes} from 'react';
import slick from 'slick-carousel';

class Slider extends Component{

  componentDidMount = () => {
    document.getElementById("slider").slick()
  }

  render(){
    return (
      <div data-slick='{"slidesToShow": 4, "slidesToScroll": 4}' id="slider">
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
        <div><h3>5</h3></div>
        <div><h3>6</h3></div>
      </div>
    )
  }

}
