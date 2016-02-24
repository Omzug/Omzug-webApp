import React from 'react';
import Helmet from 'react-helmet';

export default function NotFound() {
  return (
    <div className="container">
      <Helmet title="- -|||"/>
      <h1>- -||| 404!</h1>
      <p>这个页面不存在啊! </p>
    </div>
  );
}
