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
              <p className={styles.cnText}>基于区块链技术的去中心化房屋短租平台
              </p>
            </div>
            <div>
               <p className={styles.cnText}></p>
            </div>
            <div className={styles.enText}>
              <p>
                A convenient renting platform based on Blockchain technology
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
