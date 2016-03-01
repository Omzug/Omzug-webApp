import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {RaisedButton} from 'material-ui';
import Helmet from 'react-helmet';

@connect(
  state => ({user: state.auth.user})
)
export default class Chat extends Component {

  static propTypes = {
    user: PropTypes.object
  };

  state = {
    message: '',
    messages: []
  };

  componentDidMount() {
    if (socket) {
      socket.on('msg', this.onMessageReceived);
      setTimeout(() => {
        socket.emit('history', {offset: 0, length: 100});
      }, 100);
    }
  }

  componentWillUnmount() {
    if (socket) {
      socket.removeListener('msg', this.onMessageReceived);
    }
  }

  onMessageReceived = (data) => {
    const messages = this.state.messages;
    messages.push(data);
    this.setState({messages});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const msg = this.state.message;

    this.setState({message: ''});

    socket.emit('msg', {
      from: this.props.user.username,
      text: msg
    });
  }

  render() {
    const styles = require('./Chat.scss');
    const {user} = this.props;
    const clearHistory = (event) => {
      this.setState({messages : []})
    }

    return (
      <div className={styles.chat + ' container'}>
        <Helmet title="聊天室"/>
        <h4 className={styles.title}>聊天室</h4>

        {user &&
        <div>
          <ul>
          {this.state.messages.map((msg) => {
            return msg.from == this.props.user.username ?
             <li key={`chat.msg.${msg.id}`}><span className={styles.ownName}>{msg.from}</span>:<span className={styles.ownText}> {msg.text}</span></li>
            : <li key={`chat.msg.${msg.id}`}>{msg.from}: {msg.text}</li>
          })}
          </ul>
          <form className={"login-form " + styles.loginForm} onSubmit={this.handleSubmit}>
            <div className={styles.inputGroup}>
              <input className={styles.input} type="text" ref="message" placeholder="Enter your message"
               value={this.state.message}
               onChange={(event) => {
                 this.setState({message: event.target.value});
               }
              }/>
              <div className={styles.buttonGroup}>
                <RaisedButton onClick={this.handleSubmit} label="发送"/>
                <RaisedButton label="清空记录" onClick={clearHistory}/>
              </div>
            </div>
          </form>
        </div>}
      </div>
    );
  }
}
