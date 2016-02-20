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
    const styles = require('./About.scss');
    return (
      <div className={styles.container}>
        <h1></h1>
        <Helmet title="About Us"/>

        <div className={styles.text}>
          <p className={styles.cnText}>
          Omzug由来自斯图加特大学和柏林白湖艺术学院的<br />学生<a href="https://github.com/hanwencheng">程翰文</a>
          和<a href="http://janeschara.tumblr.com">杨鑫玥</a>于2016年在德国创建。
          <br />我们想为在德国留学的中国学生提供一个美观方便的租房平台。<br /><br /></p>
          <p>
          Omzug is a website created in 2016 by <a href="https://github.com/hanwencheng">Hanwen Cheng </a>
             from Uni Stuttgart<br />
          and <a href="http://janeschara.tumblr.com">Xinyue Yang</a> from Kunsthochschule Berlin-Weissensee. <br />
          It aims to provide a renting platform for chinese students in Germany.
          </p>
        </div>

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
