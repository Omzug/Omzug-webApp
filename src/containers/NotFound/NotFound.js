import React from 'react';
import Helmet from 'react-helmet';
import imageAddress from '../../constant/imageAddress'

export default function NotFound() {
  const styles = require('./NotFound.scss');
  return (
    <div className={styles.containerNotFound}>
      <Helmet title="- -|||"/>
      <div><h1>- -||| 404!</h1></div>
      <div><p>Ooops! 这个页面不存在啊! </p></div>
      <div><img src={imageAddress.NotFoundImage}/></div>
    </div>
  );
}
