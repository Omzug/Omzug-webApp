import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class About extends Component {

  state = {
    showKitten: false
  }

/*<a href="http://hanwencheng.com">程翰文</a>和<a href="http://janeschara.tumblr.com">杨鑫玥</a>*/
  render() {
    const {showKitten} = this.state;
    const styles = require('./About.scss');
    return (
      <div className={styles.container}>
        <Helmet title="关于我们"/>
        <div className={styles.text}>
          <div>
            <p className={styles.cnText}>Omzug由来自斯图加特大学和柏林白湖艺术学院的学生于2016年在德国柏林创建。
              网站名字来源于德文"搬家"这个单词"Umzug".
            </p>
          </div>
          <div>
             <p className={styles.cnText}> 更多的功能正在开发中,尽请期待。</p>
          </div>
          <div className={styles.enText}>
            <p>
            Omzug is a web application created in 2016 by students from Uni Stuttgart
            and Kunsthochschule Berlin-Weissensee.
            It initially aims to provide a renting platform for Chinese students in Germany.
          </p>
          </div>
        </div>
      </div>
    );
  }
}
