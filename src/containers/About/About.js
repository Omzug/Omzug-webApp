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
        <Helmet title="关于我们"/>
        <div className={styles.text}>
          <div>
            <p className={styles.cnText}>Omzug由来自斯图加特大学和柏林白湖艺术学院的学生
            <a href="http://hanwencheng.com">程翰文</a>和<a href="http://janeschara.tumblr.com">杨鑫玥</a>于2016年在德国创建。
            "Omzug"来源于德文"搬家"这个单词"Umzug".</p>
          </div>
          <div>
             <p className={styles.cnText}> 我们想为在德国留学的中国学生提供一个美观方便的租房平台。</p>
          </div>
          <div className={styles.enText}>
            <p>
            Omzug is a website created in 2016 by <a href="http://hanwencheng.com">Hanwen Cheng </a>
               from Uni Stuttgart
            and <a href="http://janeschara.tumblr.com">Xinyue Yang</a> from Kunsthochschule Berlin-Weissensee.
            It aims to provide a renting platform for chinese students in Germany.
          </p>
          </div>
        </div>
      </div>
    );
  }
}
