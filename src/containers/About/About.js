import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class About extends Component {

  state = {
    showKitten: false
  }

  handleToggleKitten = () => this.setState({showKitten: !this.state.showKitten});

  render() {
    const {showKitten} = this.state;
    const kitten = require('./kitten.jpg');
    return (
      <div className="container">
        <h1>联系我们</h1>
        <Helmet title="About Us"/>

        <p>
          Delocate由来自斯图加特大学和柏林白湖艺术学院的学生程翰文和杨鑫玥于2016年在德国创立.
          我们想为在德国留学的中国学生提供一个美观方便的租房平台.
        </p>
        <p>
          Delocate is a website created in 2016 by Hanwen Cheng from Uni Stuttgart
          and Xinyue Yang from Kunsthochschule Berlin-Weissensee. It aims to provide a renting platform for chinese students in Germany.
        </p>

        {/*
        <h3>Images</h3>

        <p>
          Psst! Would you like to see a kitten?

          <button className={'btn btn-' + (showKitten ? 'danger' : 'success')}
                  style={{marginLeft: 50}}
                  onClick={this.handleToggleKitten}>
            {showKitten ? 'No! Take it away!' : 'Yes! Please!'}</button>
        </p>

        {showKitten && <div><img src={kitten}/></div>}
        */}
      </div>
    );
  }
}
