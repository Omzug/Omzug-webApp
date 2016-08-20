import React, {Component} from 'react';
import Helmet from 'react-helmet';
import imageAddress from '../../constant/imageAddress';
import strings from '../../constant/strings';

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
              <p className={styles.cnText}>我们是在柏林的程序员和设计师, 有感于留学生在德国租房的艰难, 工作之余制作了这个网站, 希望可以帮到大家
              </p>
            </div>
            <div>
               <p className={styles.cnText}></p>
            </div>
            <div className={styles.enText}>
              <p>
              Omzug is a web application created in 2016 by a Software Engineer and a Designer.
              It aims to provide a renting platform for Chinese students in Germany.
            </p>
            </div>
          </div>
        <div className={styles.imageContainer}>
          <img className={styles.berlin} src={imageAddress.berlinImage}/>
        </div>
      </div>

    );
  }
}
