/**
 * Created by hanwencheng on 1/6/16.
 */
import React, {Component} from 'react';

export default class Entities extends Component {
  render() {
    return (
      <div>
        <h1>HauseList</h1>
        <div className="container">
          <div>
            {/* use Link to route around the app */}
            {/* this.state.entities.map(entity => (
              <Link to={`/user/${user.id}`}>{user.name}</Link>
            )) */}
          </div>
        </div>
        <div className="detail">
        </div>
      </div>
    );
  }
}
