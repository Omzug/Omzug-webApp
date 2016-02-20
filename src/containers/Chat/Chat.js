import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {FlatButton} from 'material-ui';

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
        <h1 className={styles}>Chat</h1>

        {user &&
        <div>
          <FlatButton label="清空记录" onClick={clearHistory}/>
          <ul>
          {this.state.messages.map((msg) => {
            return msg.from == this.props.user.username ?
             <li key={`chat.msg.${msg.id}`}><span className={styles.ownName}>{msg.from}</span>:<span className={styles.ownText}> {msg.text}</span></li>
            : <li key={`chat.msg.${msg.id}`}>{msg.from}: {msg.text}</li>
          })}
          </ul>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input type="text" ref="message" placeholder="Enter your message"
             value={this.state.message}
             onChange={(event) => {
               this.setState({message: event.target.value});
             }
            }/>
            <button className="btn" onClick={this.handleSubmit}>Send</button>
          </form>
        </div>}
      </div>
    );
  }
}
